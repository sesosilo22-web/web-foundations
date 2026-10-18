# SnapShare Photo-App Scaling Plan

## 1. Assumptions

SnapShare is a photo-sharing application where users upload photos and view feeds containing photos from people they follow.

The following assumptions are used:

- Registered users: 10 million.
- Daily active users: 10% of registered users.
- Each active user uploads 1 photo per day.
- Each active user views 50 feed pages per day.
- Average original photo size: 2 MB.
- Each photo has one thumbnail of 50 KB.
- One day is approximately 100,000 seconds for estimation.
- One year has 365 days.
- All uploaded photos and thumbnails are retained for one year.
- Storage calculations exclude database records, backups, replication overhead, and temporary files.
- Uploads and feed views are distributed evenly throughout the day for average-rate estimates. Real traffic may have peak periods.

## 2. Traffic and Storage Estimates

### Daily active users

10,000,000 registered users × 10% active daily

= **1,000,000 daily active users**

### Uploads per second

Each active user uploads one photo per day.

Daily uploads:

1,000,000 × 1 = 1,000,000 uploads per day

Uploads per second:

1,000,000 ÷ 100,000 = **10 uploads per second**

### Feed views per second

Each active user views 50 feed pages per day.

Daily feed views:

1,000,000 × 50 = 50,000,000 feed views per day

Feed views per second:

50,000,000 ÷ 100,000 = **500 feed views per second**

### Storage per year

Original photo storage per day:

1,000,000 × 2 MB = 2,000,000 MB = 2 TB per day

Thumbnail storage per day:

1,000,000 × 50 KB = 50,000,000 KB = 50 GB per day

Total storage per day:

2 TB + 50 GB = 2.05 TB per day

Total storage per year:

2.05 TB × 365 = **748.25 TB per year**

This estimate uses decimal units: 1 TB = 1,000 GB. It assumes all originals and thumbnails are retained, with no compression or deduplication beyond the stated image sizes.

### Summary of estimates

| Metric | Estimate |
|---|---:|
| Registered users | 10 million |
| Daily active users | 1 million |
| Uploads per day | 1 million |
| Average uploads per second | 10 |
| Feed views per day | 50 million |
| Average feed views per second | 500 |
| Original photo storage per year | 730 TB |
| Thumbnail storage per year | 18.25 TB |
| Total storage per year | 748.25 TB |

## 3. Is SnapShare Read-Heavy or Write-Heavy?

SnapShare is **read-heavy** because users view 50 feed pages per day but upload only one photo per day.

There are approximately 50 million feed views per day compared with 1 million uploads per day. The architecture should therefore optimise feed loading and photo delivery while still handling uploads reliably.

## 4. Architecture Diagram

```text
                     USERS
                       |
                       v
              +----------------+
              |      CDN       |
              | Cached images  |
              +----------------+
                       |
                       v
              +----------------+
              | Load Balancer  |
              +----------------+
                       |
                       v
              +----------------+
              |  App Servers   |
              | Stateless APIs |
              +----------------+
                 |     |     |
                 |     |     +-------------------+
                 |     |                         |
                 v     v                         v
          +----------+  +----------------+  +-------------+
          |  Redis   |  |    Database    |  |    Queue    |
          | Feed     |  | Primary + Read  |  | Thumbnail   |
          | Cache    |  | Replica         |  | Jobs        |
          +----------+  +----------------+  +-------------+
                              |                    |
                              v                    v
                       +-------------+      +-------------+
                       | Read Replica|      |   Worker    |
                       | Feed Reads  |      | Creates     |
                       +-------------+      | Thumbnails  |
                                            +-------------+
                                                   |
                                                   v
                                            +-------------+
                                            |   Object    |
                                            |   Storage   |
                                            | Originals + |
                                            | Thumbnails  |
                                            +-------------+
                                                   |
                                                   v
                                                  CDN
```

The CDN delivers cached photos to users. App servers can also communicate with object storage through secure upload and download URLs. The queue and worker handle thumbnail creation asynchronously.

## 5. Components and the Problems They Solve

- **CDN:** Delivers cached photos and thumbnails from locations closer to users, reducing latency and load on the origin.
- **Load balancer:** Distributes incoming requests across app servers to prevent one server from becoming overloaded.
- **Stateless app servers:** Handle API requests without keeping essential session state only on one server, allowing servers to be added or replaced easily.
- **Redis cache:** Stores frequently accessed feed data to reduce repeated database queries and speed up feed loading.
- **Primary database:** Stores persistent application records such as users, photo metadata, and follow relationships.
- **Database read replica:** Handles read queries to reduce the workload on the primary database.
- **Object storage:** Stores large original photo files and thumbnails without filling the application server's local disk.
- **Queue:** Holds thumbnail-generation jobs so uploads do not have to wait for image processing to finish.
- **Thumbnail worker:** Processes queued jobs, creates smaller thumbnail images, and stores them in object storage.

## 6. Step-by-Step Photo Upload Flow

1. A user selects a photo and submits it through the application.
2. The app server authenticates the user and checks that the upload is valid.
3. The server creates a photo metadata record or upload request and generates a secure upload URL for object storage.
4. The user's application uploads the original photo to object storage using that URL.
5. Once the upload succeeds, the application or storage event confirms the upload, and the server records the photo's status and metadata.
6. The server places a thumbnail-generation job on the queue.
7. The server returns a successful upload response without waiting for thumbnail generation to finish.
8. A worker takes the job from the queue and creates a 50 KB thumbnail from the original photo.
9. The worker saves the thumbnail in object storage and updates the photo's processing status.
10. The CDN can deliver the original photo and thumbnail when users request them.
11. The relevant feed cache is invalidated or updated so followers can see the new photo.

## 7. Trade-Offs

### Trade-off 1: Redis caching versus fresh data

**Benefit:** Redis reduces database queries and makes feed loading faster.

**Cost:** Cached data can become stale when users upload photos or change who they follow. The system must invalidate or update relevant cache entries.

### Trade-off 2: Asynchronous thumbnail generation versus immediate availability

**Benefit:** A queue and worker allow the upload response to return quickly without waiting for image processing.

**Cost:** The thumbnail may not be available immediately. The application must handle processing states and retry failed jobs.

### Trade-off 3: Database read replicas versus consistency

**Benefit:** Read replicas distribute database read traffic and help the primary database handle writes.

**Cost:** Replication can lag behind the primary database, so recently updated information may not appear immediately when read from a replica.

### Trade-off 4: CDN caching versus storage freshness

**Benefit:** CDN caching reduces latency and lowers the number of requests reaching object storage.

**Cost:** Cached images may remain available after an update or deletion unless cache invalidation or versioned URLs are used.

## 8. Conclusion

SnapShare has approximately 1 million daily active users, 10 average uploads per second, and 500 average feed views per second. Storing every original photo and thumbnail requires approximately 748.25 TB per year under the stated assumptions.

Because the system is read-heavy, it uses a CDN, Redis caching, and a database read replica to improve feed performance. Object storage handles photo files, while a queue and worker generate thumbnails asynchronously. These components help the application scale, although caching, asynchronous processing, and replication introduce trade-offs that must be managed.
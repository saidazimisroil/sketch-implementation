function kMeans(points, k) {
    // Initialize centroids randomly
    let centroids = [];
    for (let i = 0; i < k; i++) {
        centroids.push({
            x: Math.random() * 10,
            y: Math.random() * 10,
            z: Math.random() * 10
        });
    }

    // Main loop
    let converged = false;
    while (!converged) {
        let clusters = Array.from({ length: k }, () => []);

        // Assign points to clusters
        points.forEach((point, index) => {
            let closestCentroidIndex = 0;
            let minDistance = distance(point, centroids[0]);

            for (let i = 1; i < centroids.length; i++) {
                let distanceToCentroid = distance(point, centroids[i]);
                if (distanceToCentroid < minDistance) {
                    minDistance = distanceToCentroid;
                    closestCentroidIndex = i;
                }
            }

            clusters[closestCentroidIndex].push(index);
        });

        // Calculate new centroids
        let newCentroids = [];
        clusters.forEach(cluster => {
            if (cluster.length > 0) {
                let sum = cluster.reduce((acc, index) => {
                    return {
                        x: acc.x + points[index][0],
                        y: acc.y + points[index][1],
                        z: acc.z + points[index][2]
                    };
                }, { x: 0, y: 0, z: 0 });

                newCentroids.push({
                    x: sum.x / cluster.length,
                    y: sum.y / cluster.length,
                    z: sum.z / cluster.length
                });
            } else {
                // If cluster is empty, keep the same centroid
                newCentroids.push(centroids[newCentroids.length]);
            }
        });

        // Check for convergence
        converged = true;
        for (let i = 0; i < k; i++) {
            if (!isEqual(centroids[i], newCentroids[i])) {
                converged = false;
                centroids = newCentroids;
                break;
            }
        }
    }

    return centroids;
}

function distance(point1, point2) {
    return Math.sqrt(
        Math.pow(point1[0] - point2.x, 2) +
        Math.pow(point1[1] - point2.y, 2) +
        Math.pow(point1[2] - point2.z, 2)
    );
}

function isEqual(obj1, obj2) {
    return obj1.x === obj2.x && obj1.y === obj2.y && obj1.z === obj2.z;
}

// Example data
let points = [
    [1.0, 2.0, 3.0],
    [4.0, 5.0, 6.0],
    [7.0, 8.0, 9.0],
    [10.0, 11.0, 12.0],
    [13.0, 14.0, 15.0]
];

let k = 2; // Number of clusters
let centroids = kMeans(points, k);

console.log("Cluster centroids:");
centroids.forEach(centroid => {
    console.log(`(${centroid.x}, ${centroid.y}, ${centroid.z})`);
});

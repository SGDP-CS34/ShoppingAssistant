const cosineSim = require("../utils/cosine_sim.json");
const idToIndex = require("../utils/id_to_index.json");

class RecommenderService {
  static getRecommendations(productID, numberOfRecommendations = 3) {
    // Check if productID exists in the idToIndex object
    if (!(productID in idToIndex)) {
      return [];
    }
    const index = idToIndex[productID];
    const topRecommendationsIndexes = this._calculateRecommendations(
      index,
      numberOfRecommendations
    );
    // Map the indexes to product IDs
    const topRecommendations = topRecommendationsIndexes.map(
      (recommendation) => {
        const productID = Object.keys(idToIndex).find(
          (key) => idToIndex[key] === recommendation[0]
        );
        return { productID, similarity: recommendation[1] };
      }
    );
    return topRecommendations;
  }

  static _calculateRecommendations(index, numberOfRecommendations) {
    const simScores = cosineSim[index].map((similarity, i) => [i, similarity]);
    simScores.sort((a, b) => b[1] - a[1]);
    const topRecommendations = simScores.slice(1, numberOfRecommendations + 1);
    return topRecommendations;
  }
}

module.exports = RecommenderService;

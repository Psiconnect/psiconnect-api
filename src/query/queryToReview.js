import PROFESSIONAL from "../models/PROFESSIONAL.js";
import REVIEW from "../models/REVIEW.js";
import USERS from "../models/USERS.js";

export async function findAllReviews() {
  const reviews = await REVIEW.findAll({
    include: [
      {
        model: USERS,
      },
      { model: PROFESSIONAL },
    ],
  });
  return reviews;
}
export async function createReview(body) {
  const reviews = await REVIEW.create(body
  );
  return reviews;
}

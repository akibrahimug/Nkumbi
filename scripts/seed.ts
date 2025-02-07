// Load environment variables first
import "./env";

import { connectDB } from "@/lib/mongoose";
import User from "@/models/User";
import Post from "@/models/Post";
import Comment from "@/models/Comment";
import bcrypt from "bcryptjs";

const FARMING_POSTS = [
  {
    content:
      "Excited to share my success with drought-resistant maize varieties this season! Using KDV-1 and WE1101 varieties increased my yield by 40% despite the erratic rainfall. Anyone else tried these varieties?",
    media:
      "https://images.unsplash.com/photo-1471194402529-8e0f5a675de6?q=80&w=2340&fit=crop",
  },
  {
    content:
      "Market update: Current prices at Wakulima Market\n- Tomatoes: KES 4,500/crate\n- Potatoes: KES 2,800/90kg bag\n- Onions: KES 1,800/net\n- Cabbage: KES 35/piece\nPrices expected to stabilize next week. Plan your sales accordingly!",
  },
  {
    content:
      "Just implemented a new integrated pest management system in my tomato greenhouse. Using neem-based solutions and beneficial insects. Already seeing a huge reduction in pest problems without chemical pesticides.",
    media:
      "https://images.unsplash.com/photo-1592921870789-04563d55041c?q=80&w=2340&fit=crop",
  },
  {
    content:
      "Question for experienced farmers: My cassava plants are showing these white spots on leaves and some curling. Any idea what this might be and how to treat it organically? Attached photos for reference.",
    media:
      "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?q=80&w=2340&fit=crop",
  },
  {
    content:
      "Big milestone! Just completed setting up my drip irrigation system covering 2 acres. Total cost was KES 180,000 including water tank. Expecting to reduce water usage by 60% and increase consistency in vegetable production.",
    media:
      "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a4?q=80&w=2340&fit=crop",
  },
  {
    content:
      "Soil testing results came back for my new farm plot. pH is 5.5 (slightly acidic), low in nitrogen and phosphorus. Any recommendations for organic amendments to improve soil health before planting?",
  },
];

const FARMING_COMMENTS = [
  {
    content:
      "I've been using KDV-1 for two seasons now. The key is early planting - I start as soon as the first rains come. Also found that spacing at 75cm between rows gives best results.",
    replies: [
      {
        content:
          "What's your experience with fertilizer application for KDV-1? I've heard it needs less than traditional varieties.",
      },
      {
        content:
          "Do you practice crop rotation with your KDV-1? If so, what's your rotation schedule?",
      },
    ],
  },
  {
    content:
      "Thanks for the market update! Any insights on the best time to transport produce to minimize losses? I'm about 80km from Wakulima.",
    replies: [
      {
        content:
          "I transport at night, leaving around 2 AM to arrive by 6 AM. Less traffic and cooler temperatures help preserve produce quality.",
      },
    ],
  },
  {
    content:
      "Could you share more details about the beneficial insects you're using? I'm battling whiteflies in my greenhouse and want to try biological control.",
    replies: [
      {
        content:
          "Ladybugs work great for whiteflies! You can order them from Kenya Biologics. One release every 2-3 weeks during the growing season.",
      },
      {
        content:
          "Have you tried yellow sticky traps along with beneficial insects? They help monitor pest populations.",
      },
    ],
  },
  {
    content:
      "Looks like cassava mosaic disease. Try removing infected plants and planting resistant varieties like TME 419. Also important to control whiteflies which spread the disease.",
    replies: [
      {
        content:
          "How far should I remove the infected plants from the healthy ones? Want to make sure I create enough distance.",
      },
    ],
  },
  {
    content:
      "Great investment! What's the spacing between your drip lines and emitters? Planning a similar system for my farm.",
    replies: [
      {
        content:
          "Not OP, but I use 30cm spacing between emitters for vegetables. Works well for most crops.",
      },
    ],
  },
  {
    content:
      "For organic soil amendment, try a mix of well-rotted manure (10 tons/acre), rock phosphate (200kg/acre), and dolomitic limestone (1 ton/acre) to address both nutrient deficiency and pH. Cover cropping with legumes will also help with nitrogen.",
    replies: [
      {
        content:
          "Which legumes do you recommend for cover cropping in Kenya's climate?",
      },
      {
        content:
          "How long do you let the cover crop grow before incorporating it into the soil?",
      },
    ],
  },
  {
    content:
      "Which supplier did you use for the irrigation system? Those costs look very competitive!",
  },
  {
    content:
      "Be careful with neem oil application timing - early morning or late evening works best to avoid leaf burn. I mix 5ml neem oil with 1L water and a drop of liquid soap as surfactant.",
    replies: [
      {
        content: "How often do you need to reapply after rain?",
      },
    ],
  },
];

// Function to randomly select n items from an array
function getRandomItems<T>(array: T[], n: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

async function seed() {
  try {
    await connectDB();
    console.log("Connected to MongoDB");

    // Clear existing data
    await User.deleteMany({});
    await Post.deleteMany({});
    await Comment.deleteMany({});

    // Create seed users
    const password = await bcrypt.hash("password123", 10);
    const users = await User.create([
      {
        name: "John Kamau",
        username: "johnkamau",
        email: "john@example.com",
        password,
        location: "Nyeri, Kenya",
      },
      {
        name: "Sarah Omondi",
        username: "sarahomondi",
        email: "sarah@example.com",
        password,
        location: "Kisumu, Kenya",
      },
      {
        name: "Michael Mutua",
        username: "michaelmutua",
        email: "michael@example.com",
        password,
        location: "Machakos, Kenya",
      },
      {
        name: "Alice Wanjiku",
        username: "alicewanjiku",
        email: "alice@example.com",
        password,
        location: "Nakuru, Kenya",
      },
    ]);

    // Create seed posts with likes and dislikes
    const posts = await Post.create(
      FARMING_POSTS.map((post, index) => {
        const likingUsers = getRandomItems(
          users.filter((u) => u._id !== users[index % users.length]._id),
          Math.floor(Math.random() * 3) + 1
        );

        const dislikingUsers = getRandomItems(
          users.filter(
            (u) =>
              u._id !== users[index % users.length]._id &&
              !likingUsers.find((lu) => lu._id.equals(u._id))
          ),
          Math.floor(Math.random() * 2)
        );

        return {
          ...post,
          userId: users[index % users.length]._id,
          likes: likingUsers.map((u) => u._id),
          dislikes: dislikingUsers.map((u) => u._id),
        };
      })
    );

    // Create parent comments with likes and dislikes
    const parentComments = await Promise.all(
      FARMING_COMMENTS.map(async (comment, index) => {
        const commentAuthorId = users[(index + 2) % users.length]._id;

        const likingUsers = getRandomItems(
          users.filter((u) => !u._id.equals(commentAuthorId)),
          Math.floor(Math.random() * 2) + 1
        );

        const dislikingUsers = getRandomItems(
          users.filter(
            (u) =>
              !u._id.equals(commentAuthorId) &&
              !likingUsers.find((lu) => lu._id.equals(u._id))
          ),
          Math.floor(Math.random() * 2)
        );

        const parentComment = await Comment.create({
          content: comment.content,
          userId: commentAuthorId,
          postId: posts[index % posts.length]._id,
          likes: likingUsers.map((u) => u._id),
          dislikes: dislikingUsers.map((u) => u._id),
        });

        // Create reply comments if they exist
        if (comment.replies) {
          const replies = await Promise.all(
            comment.replies.map(async (reply, replyIndex) => {
              const replyAuthorId = users[(replyIndex + 1) % users.length]._id;

              const replyLikingUsers = getRandomItems(
                users.filter((u) => !u._id.equals(replyAuthorId)),
                Math.floor(Math.random() * 2) + 1
              );

              const replyDislikingUsers = getRandomItems(
                users.filter(
                  (u) =>
                    !u._id.equals(replyAuthorId) &&
                    !replyLikingUsers.find((lu) => lu._id.equals(u._id))
                ),
                Math.floor(Math.random() * 2)
              );

              return await Comment.create({
                content: reply.content,
                userId: replyAuthorId,
                postId: posts[index % posts.length]._id,
                parentCommentId: parentComment._id,
                likes: replyLikingUsers.map((u) => u._id),
                dislikes: replyDislikingUsers.map((u) => u._id),
              });
            })
          );

          // Update parent comment with reply IDs
          await Comment.findByIdAndUpdate(parentComment._id, {
            replies: replies.map((reply) => reply._id),
          });
        }

        return parentComment;
      })
    );

    console.log("Seed data created successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
}

seed();

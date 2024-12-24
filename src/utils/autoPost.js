import { getPosts } from "@/utils/localStorage";

export const autoPost = () => {
  const campaigns = JSON.parse(localStorage.getItem("campaigns")) || [];
  const posts = getPosts();

  const now = new Date();
  const currentDate = now.toISOString().split("T")[0];
  const currentTime = now.toTimeString().slice(0, 5); // HH:mm format

  campaigns.forEach((campaign) => {
    if (campaign.date === currentDate && campaign.time === currentTime) {
      const post = posts.find((p) => p.name === campaign.title);
      if (post) {
        console.log(`Posting "${post.text}" to ${campaign.socialMedia}`);
        alert(`Post "${post.name}" is now published on ${campaign.socialMedia}!`);

        // Emit "post-published" event
        const postPublishedEvent = new CustomEvent("post-published", {
          detail: { title: post.name, socialMedia: campaign.socialMedia },
        });
        window.dispatchEvent(postPublishedEvent);
      } else {
        console.warn(`No post found with the title "${campaign.title}"`);
      }
    }
  });
};



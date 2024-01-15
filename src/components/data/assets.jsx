//SC - how it will show to service buyer.
//TD - how is shows to the person doing the task.


const socialPlatforms = [
    {
        'assetplatform': 'facebook',
        assets: [
            {
                asset: 'Facebook Friend',
                SC: 'Get People To Add You As Facebook Friend',
                TD: 'Get Paid For Adding User As Facebook Friend',
                verification: 'Screenshot showing user has sent a friend request to the account',
                CostToOrder: 5,
                amountForTask: 3,
            },
            {
                asset: 'Page Likes',
                SC: 'Get People To Like Your Facebook Page',
                TD: 'Get Paid For Liking User’s Facebook Page',
                verification: 'Screenshot showing user has liked the particular page',
                CostToOrder: 5,
                amountForTask: 3,
            },
            {
                asset: 'Page Followers',
                SC: 'Get People To Follow Your Facebook Page',
                TD: 'Get Paid For Following User’s Facebook Page',
                verification: 'Screenshot showing user followed the particular page',
                CostToOrder: 5,
                amountForTask: 3,
            },
            {
                asset: 'Post Likes',
                SC: 'Get People To Like Your Facebook Post',
                TD: 'Get Paid For liking User’s Facebook Post',
                verification: 'Screenshot showing user has liked the particular post',
                CostToOrder: 5,
                amountForTask: 3,
            },
            {
                asset: 'Video Views',
                SC: 'Get People To View Your Facebook Video',
                TD: 'Get Paid For Viewing User’s Facebook Video',
                verification: 'Screenshots between 12th and 15th seconds while viewing the video then upload for verification',
                CostToOrder: 10,
                amountForTask: 5,
            },
            {
                asset: 'Comment',
                SC: 'Get People To Comment on Your Facebook Post',
                TD: 'Get Paid For Commenting on User’s Facebook Post',
                verification: 'Screenshot showing user commended based on comment options and samples sent by client or something close',
                CostToOrder: 20,
                amountForTask: 10,
            },
            {
                asset: 'Share',
                SC: 'Get People To Share Your Post Facebook',
                TD: 'Get Paid For Sharing a User’s Facebook Post on your Facebook Page',
                verification: "Screenshot showing user's post on their profile after being shared",
                CostToOrder: 50,
                amountForTask: 25,
            },
            {
                asset: 'Post Your Content',
                SC: 'Get People To Post Your Content on Their Facebook',
                TD: 'Get Paid For Posting a User’s Content on your Facebook',
                verification: 'Screenshot of the clients content being posted on their page',
                CostToOrder: 100,
                amountForTask: 3,
            },
        ]
    },
    {
        'assetplatform': 'instagram',
        assets: [
            {
                asset: 'Page Followers',
                SC: 'Get People To Follow Your Instagram Page',
                TD: 'Get Paid For Following User’s Instagram Page',
                verification: 'Screenshot showing user followed the particuler page',
                CostToOrder: 5,
                amountForTask: 3,
            },
            {
                asset: 'Post Likes',
                SC: 'Get People To Like Your Instagram Post',
                TD: 'Get Paid For liking User’s Instagram Post',
                verification: 'Screenshot showing user liked the particular post',
                CostToOrder: 5,
                amountForTask: 3,
            },
            {
                asset: 'Video Views',
                SC: 'Get People To View Your Instagram Video/Reel',
                TD: 'Get Paid For Viewing User’s Instagram Video/Reel',
                verification: 'Screenshots while viewing the video then upload for verification',
                CostToOrder: 10,
                amountForTask: 5,
            },
            {
                asset: 'Instagram Story View',
                SC: 'Get People To View Your Instagram Story',
                TD: 'Get Paid For Viewing User’s Instagram Story',
                verification: 'Screenshots while viewing the story then upload for verification',
                CostToOrder: 5,
                amountForTask: 3,
            },
            {
                asset: 'Comment',
                SC: 'Get People To Comment on Your Instagram Post',
                TD: 'Get Paid For Commenting on User’s Instagram Post',
                verification: 'Screenshot showing user commented based on comment options and samples sent by client or something close',
                CostToOrder: 20,
                amountForTask: 10,
            },
            {
                asset: 'Share',
                SC: 'Get People To Share Your Instagram Post',
                TD: 'Get Paid For Sharing a User’s Instagram Post',
                verification: ' Screenshot showing user’s post shared to another friend on Instagram or on story after being shared',
                CostToOrder: 50,
                amountForTask: 25,
            },
            {
                asset: 'Post Your Content',
                SC: 'Get People To Post Your Content on Their Instagram',
                TD: 'Get Paid For Posting a User’s Content on your Instagram',
                verification: 'Screenshot of the clients content being posted on their page.',
                CostToOrder: 100,
                amountForTask: 50,
            }
        ]
    },
    {
        'assetplatform': 'twitter',
        assets: [
            {
                asset: 'Page Followers',
                SC: 'Get People To Follow Your Twitter Page',
                TD: 'Get Paid For Following User’s Twitter Page',
                verification: 'Screenshot showing user Followed the particular page',
                CostToOrder: 5,
                amountForTask: 3,
            },
            {
                asset: 'Post likes',
                SC: 'Get People To Like Your Twitter Post',
                TD: 'Get Paid For liking User’s Twitter Post',
                verification: 'Screenshot showing user has liked the particular post',
                CostToOrder: 5,
                amountForTask: 3,
            },
            {
                asset: 'Video Views',
                SC: 'Get People To View Your Twitter Video',
                TD: 'Get Paid For Viewing User’s Twitter Video',
                verification: 'Screenshots while viewing the video then upload for verification',
                CostToOrder: 10,
                amountForTask: 5,
            },
            {
                asset: 'Comment',
                SC: 'Get People To Comment on Your Instagram Post',
                TD: 'Get Paid For Commenting on User’s Instagram Post',
                verification: 'Screenshot showing user commented based on comment options and samples sent by client or something close',
                CostToOrder: 20,
                amountForTask: 10,
            },
            {
                asset: 'Retweet',
                SC: 'Get People To Retweet Your Tweet',
                TD: 'Get Paid For Retweeting a User’s Tweet',
                verification: 'Screenshot showing user’s has retweeted the particular tweet',
                CostToOrder: 50,
                amountForTask: 25,
            },
            {
                asset: 'Quote Tweet',
                SC: 'Get People To Quote Your Tweet',
                TD: 'Get Paid For Quoting a User’s Tweet',
                verification: 'Screenshot showing user’s has quoted the particular tweet, quote based on quote options and samples sent by client',
                CostToOrder: 100,
                amountForTask: 50,
            },
            {
                asset: 'Join Twitter Space',
                SC: 'Get People To Join Your Twitter Space',
                TD: 'Get Paid For Joining a Twitter Space',
                verification: 'Screenshot while listening to the space then upload for verification',
                CostToOrder: 100,
                amountForTask: 50,
            },
            {
                asset: 'Post Your Content',
                SC: 'Get People To Post Your Content on Their Twitter Page',
                TD: 'Get Paid For Posting a User’s Content on your Twitter Page',
                verification: 'Screenshot of the clients content being posted on their page',
                CostToOrder: 100,
                amountForTask: 50,
            }
        ]
    },
    {
        'assetplatform': 'tiktok',
        assets: [
            {
                asset: 'Page Followers',
                SC: 'Get People To Follow Your Tiktok Page',
                TD: 'Get Paid For Following User’s Tiktok Page',
                verification: 'Screenshot showing user Followed the particular page',
                CostToOrder: 5,
                amountForTask: 3,
            },
            {
                asset: 'Post Likes',
                SC: 'Get People To Like Your Tiktok Post',
                TD: 'Get Paid For liking User’s Tiktok Post',
                verification: 'Screenshot showing user has liked the particular post',
                CostToOrder: 5,
                amountForTask: 3,
            },
            {
                asset: 'Video Views',
                SC: 'Get People To View Your TIktok Video',
                TD: 'Get Paid For Viewing User’s Tiktok Video',
                verification: 'Screenshots while viewing the video then upload for verification',
                CostToOrder: 10,
                amountForTask: 5,
            },
            {
                asset: 'TikTok Favourites',
                SC: 'Get People To Favourite Your post on TIktok',
                TD: 'Get Paid For Favoriting User’s post on Tiktok',
                verification: 'Screenshot Showing user has Favourited the post',
                CostToOrder: 5,
                amountForTask: 2.5,
            },
            {
                asset: 'Comment',
                SC: 'Get People To Comment on Your TIktok Post',
                TD: 'Get Paid For Commenting on User’s post on Tiktok',
                verification: 'Screenshot showing user commented based on comment options and samples sent by client or something close.',
                CostToOrder: 20,
                amountForTask: 10,
            },
            {
                asset: 'Share',
                SC: 'Get People To Share/Repost Your TIktok Post',
                TD: 'Get Paid For Sharing/Reposting User’s post on Tiktok',
                verification: "Screenshot showing user’s post shared to another friend on Tiktok or on user’s page",
                CostToOrder: 50,
                amountForTask: 25,
            },
            {
                asset: 'Share With Comment',
                SC: 'Get People To Share with comment on Your TIktok Post',
                TD: 'Get Paid For Sharing with comment a User’s post on Tiktok',
                verification: "Screenshot showing user’s post shared on page with comment",
                CostToOrder: 50,
                amountForTask: 25,
            },
            {
                asset: 'Post Your Content',
                SC: 'Get People To Post Your Content on Their TikTok Page',
                TD: 'Get Paid For Posting a User’s Content on your TikTok Page',
                verification: "Screenshot of the clients content being posted on their page",
                CostToOrder: 100,
                amountForTask: 50,
            }
        ]
    },
    {
        'assetplatform': 'youtube',
        assets: [
            {
                asset: 'Subscribers',
                SC: 'Get People To Subscribe to your YouTube',
                TD: 'Get Paid For Subscribing to a User’s YouTube',
                verification: "Screenshot showing user Subscribed to the particular page.",
                CostToOrder: 50,
                amountForTask: 25,
            },
            {
                asset: 'Post Likes',
                SC: 'Get People To Like to your YouTube Content',
                TD: 'Get Paid For Liking a User’s YouTube Content',
                verification: "Screenshot showing user has liked the particular Video, short or picture post.",
                CostToOrder: 10,
                amountForTask: 5,
            },
            {
                asset: 'Video Views',
                SC: 'Get People To View your YouTube Video',
                TD: 'Get Paid For Viewing a User’s YouTube Video',
                verification: "Screenshots between 12th and 15th seconds while viewing the video then upload for verification",
                CostToOrder: 30,
                amountForTask: 15,
            },
            {
                asset: 'Comment',
                SC: 'Get People To Comment on your YouTube Content',
                TD: 'Get Paid For Commenting on a User’s YouTube Video',
                verification: "Screenshot showing user commented based on comment options and samples sent by client or something close.",
                CostToOrder: 20,
                amountForTask: 10,
            },
            {
                asset: 'Share',
                SC: 'Get People To Share Your YouTube Content To Other Social Media Platforms',
                TD: 'Get Paid For Sharing User’s YouTube Content To Other Social Media Platforms',
                verification: "Screenshot showing user’s post shared to another Social Media platform.",
                CostToOrder: 50,
                amountForTask: 25,
            }
        ]
    },
    {
        'assetplatform': 'linkedin',
        assets: [
            {
                asset: 'LinkedIn Connect',
                SC: 'Get People To Connect With You On LinkedIn',
                TD: 'Get Paid For Connecting to a User on LinkedIn',
                verification: "Screenshot showing user Connected to the particular page",
                CostToOrder: 5,
                amountForTask: 3,
            },
            {
                asset: 'Page Followers',
                SC: 'Get People To Follow You On LinkedIn',
                TD: 'Get Paid For Following a User on LinkedIn',
                verification: "Screenshot showing user Followed the particular page",
                CostToOrder: 5,
                amountForTask: 3,
            },
            {
                asset: 'Post Likes',
                SC: 'Get People To Like Your Post On LinkedIn',
                TD: 'Get Paid For Liking a User’s Post on LinkedIn',
                verification: "Screenshot showing user has liked the particular Video, short or picture post",
                CostToOrder: 5,
                amountForTask: 3,
            },
            {
                asset: 'Share',
                SC: 'Get People To Send Your LinkedIn Content To Other LinkedIn Connect/Friend on LinkedIn',
                TD: 'Get Paid For Sending User’s Content To Other LinkedIn Connect/Friend on LinkedIn',
                verification: "Screenshot DM Showing it was sent to a Connect/Friend on LinkedIn",
                CostToOrder: 10,
                amountForTask: 5,
            },
            {
                asset: 'Comment',
                SC: 'Get People To Comment on Your Post On LinkedIn',
                TD: 'Get Paid For Commenting on a User’s Post on LinkedIn',
                verification: " Screenshot showing user commented based on comment options and samples sent by client or something close",
                CostToOrder: 20,
                amountForTask: 10,
            },
            {
                asset: 'Repost',
                SC: 'Get People To Repost Your Post On LinkedIn',
                TD: 'Get Paid For Reposting on a User’s Post on LinkedIn',
                verification: "Screenshot showing user reposted post on Feed/Page",
                CostToOrder: 30,
                amountForTask: 15,
            },
            {
                asset: 'Repost With comment',
                SC: 'Get People To Repost Your Post On LinkedIn With a comment',
                TD: 'Get Paid For Reposting on a User’s Post on LinkedIn with a comment',
                verification: " Screenshot showing user reposted post on Feed/Page with comment based in Comment Options and samples if provided by client",
                CostToOrder: 50,
                amountForTask: 25,
            },
            {
                asset: 'Post Your Content',
                SC: 'Get People To Post Your content On Their LinkedIn Page',
                TD: 'Get Paid for Posting a user’s Your content On your LinkedIn Page',
                verification: "Screenshot of the clients Content on their page",
                CostToOrder: 100,
                amountForTask: 50,
            }

        ]
    },
    {
        'assetplatform': 'whatsapp',
        assets: [
            {
                asset: 'Post Your Content',
                SC: 'Get People To Post Your Post content on their WhatsApp Status',
                TD: 'Get Paid for Posting a user’s Post content on your WhatsApp Status',
                verification: 'Take a screenshot of the content(Flyer/Design and write up as the case maybe) on your status after you have uploaded then upload for verification',
                CostToOrder: 150,
                amountForTask: 75,
            }
        ]
    },
    {
        'assetplatform': 'iOS App Download',
        assets: [
            {
                asset: 'Download App',
                SC: 'Get People To Download Your App on iOS',
                TD: 'Get Paid for Downloading a user’s App on iOS',
                verification: "Screenshot showing the app on your phone after downloading.",
                CostToOrder: 100,
                amountForTask: 50,
            },
            {
                asset: 'Download App and Review',
                SC: 'Get People To Download and Review Your App on iOS',
                TD: 'Get Paid for Downloading and Reviewing a user’s App on iOS',
                verification: "Screenshot showing you reviewed the app on IOS App Store",
                CostToOrder: 150,
                amountForTask: 75,
            },
            {
                asset: 'Download App Review and Register',
                SC: 'Get People To Download, Review and Register on Your App on iOS',
                TD: 'Get Paid for Downloading, Reviewing and Registering on a user’s App on iOS',
                verification: "Screenshot showing your dashboard after you logged into the App",
                CostToOrder: 200,
                amountForTask: 100,
            }

        ]
    },
    {
        'assetplatform': 'android app download',
        assets: [
            {
                asset: 'Download App',
                SC: 'Get People To Download Your App on Android PlayStore',
                TD: 'Get Paid for Downloading a user’s App on Android PlayStore',
                verification: "Screenshot showing the app on your phone after downloading",
                CostToOrder: 100,
                amountForTask: 50,
            },
            {
                asset: 'Download App and Review',
                SC: 'Get People To Download and Review Your App on Android PlayStore',
                TD: 'Get Paid for Downloading and Reviewing a user’s App on Android PlayStore',
                verification: "Screenshot showing you reviewed the app on Android playstore",
                CostToOrder: 150,
                amountForTask: 75,
            },
            {
                asset: 'Download App Review and Register',
                SC: 'Get People To Download, Review and Register on Your App on Android PlayStore',
                TD: 'Get Paid for Downloading, Reviewing and Registering on user’s App on Android PlayStore.',
                verification: "Screenshot showing your dashboard after you logged into the app",
                CostToOrder: 200,
                amountForTask: 100,
            },
        ]
    },
    {
        'assetplatform': 'boomplay',
        assets: [
            {
                asset: 'Follow',
                SC: 'Get People To Follow You On Boomplay',
                TD: 'Get Paid for Following User On Boomplay',
                verification: "Screenshot showing user Followed the particular page.",
                CostToOrder: 10,
                amountForTask: 5,
            },
            {
                asset: 'Like/Favourite',
                SC: 'Get People To Like/Favourite Your Song/Content On Boomplay',
                TD: 'Get Paid for Liking/Favoriting a User’s Song/Content On Boomplay',
                verification: "Screenshot showing user likes the content.",
                CostToOrder: 5,
                amountForTask: 3,
            },
            {
                asset: 'Comment',
                SC: 'Get People To Comment on Your Song/Content On Boomplay',
                TD: 'Get Paid for Commenting on User’s Song/Content On Boomplay',
                verification: "Screenshot comment on the content after it’s been posted on the page based on comment options and samples sent by client or something close.",
                CostToOrder: 50,
                amountForTask: 25,
            },
            {
                asset: 'Stream',
                SC: 'Get People To Stream Your Song/Content On Boomplay',
                TD: 'Get Paid for Streaming on User’s Song/Content On Boomplay',
                verification: "4 different Screenshot at 4 different occasions while streaming",
                CostToOrder: 50,
                amountForTask: 25,
            },
            {
                asset: 'Share',
                SC: 'Get People To Share Your Song/Content On Boomplay',
                TD: 'Get Paid for Sharing User’s Song/Content On Boomplay',
                verification: "Screenshot showing user’s content shared to another Social Media Platform",
                CostToOrder: 30,
                amountForTask: 15,
            }
        ]
    },
    {
        'assetplatform': 'audiomack',
        assets: [
            {
                asset: 'Follow',
                SC: 'Get People To Follow You On Audiomack',
                TD: 'Get Paid for Following User On Audiomack',
                verification: "Screenshot showing user Followed the particular page.",
                CostToOrder: 10,
                amountForTask: 5,
            },
            {
                asset: 'Like/Favourite',
                SC: 'Get People To Like Your Song/Content On Audiomack',
                TD: 'Get Paid for Liking User’s Song/Content On Audiomack',
                verification: "Screenshot showing You like the particular Song/Content.",
                CostToOrder: 5,
                amountForTask: 2.5,
            },
            {
                asset: 'Comment',
                SC: 'Get People To Comment on Your Song/Content On Audiomack',
                TD: 'Get Paid for Commenting on User’s Song/Content On Audiomack',
                verification: "Screenshot showing your comment on the content after it’s been  posted on the page based on comment options and samples sent by client or something close",
                CostToOrder: 50,
                amountForTask: 25,
            },
            {
                asset: 'Stream',
                SC: 'Get People To Stream Your Song/Content On Audiomack',
                TD: 'Get Paid for Streaming on User’s Song/Content On Audiomack',
                verification: "Take a screenshot between the 12th and 15th seconds while streaming that particular content then upload for verification",
                CostToOrder: 50,
                amountForTask: 25,
            },
            {
                asset: 'Share',
                SC: 'Get People To Share Your Song/Content On Audiomack',
                TD: 'Get Paid for Sharing User’s Song/Content On Audiomack',
                verification: "Screenshot showing you shared User’s Content/ Song to another Social Media Platform",
                CostToOrder: 30,
                amountForTask: 15,
            }
        ]
    },
    {
        'assetplatform': 'spotify',
        assets: [
            {
                asset: 'Follow',
                SC: 'Get People To Follow You On Spotify',
                TD: 'Get Paid for Following User On Spotify',
                verification: "Screenshot showing You Followed the particular page.",
                CostToOrder: 10,
                amountForTask: 5,
            },
            {
                asset: 'Like/Favourite',
                SC: 'Get People To Add your song to Liked Songs On Spotify',
                TD: 'Get Paid for Adding a user’s Songs to liked On Spotify',
                verification: "Screenshot showing you adding song to liked songs",
                CostToOrder: 5,
                amountForTask: 3,
            },
            {
                asset: 'Stream',
                SC: 'Get People To Stream Your Song/Content On Spotify',
                TD: 'Get Paid for Streaming on User’s Song/Content On Spotify',
                verification: "Take a screenshot between the 12th and 15th seconds while streaming that particular content then upload for verification",
                CostToOrder: 50,
                amountForTask: 25,
            },
            {
                asset: 'Share',
                SC: 'Get People To Share Your Song/Content On Spotify',
                TD: 'Get Paid for Sharing User’s Song/Content On Spotify',
                verification: "Screenshot showing you shared User’s Content/ Song to another Social Media Platform",
                CostToOrder: 30,
                amountForTask: 15,
            }
        ]
    },
]

export default socialPlatforms



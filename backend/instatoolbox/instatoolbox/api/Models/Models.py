
class Post:
    def __init__(self,posttype,posttext,postparenturl,ispinned,postlikes,postcomments,postchildurls,videosrc):
        self.posttype=posttype
        self.postparenturl=postparenturl
        self.posttext=posttext
        self.postlikes=postlikes
        self.postcomments=postcomments
        self.ispinned=ispinned
        self.postchildurls=postchildurls
        self.videosrc=videosrc
        
    def to_dict(self):
        return {
            "posttype": self.posttype,
            "postparenturl": self.postparenturl,
            'videosrc':self.videosrc,
            "posttext": self.posttext,
            "postlikes": self.postlikes,
            "postcomments": self.postcomments,
            "ispinned": self.ispinned,
            "postchildurls": self.postchildurls
        }



class User:
    def __init__(self,userid,username,fullname,biography,postscount,profile_picurl,followingcount,endcursor,posts,followedby):
        self.userid=userid
        self.username=username
        self.full_name=fullname
        self.biography=biography
        self.postscount=postscount
        self.profile_picurl=profile_picurl
        self.followingcount=followingcount
        self.followedby=followedby
        self.endcursor=endcursor
        self.posts=posts
    
    def to_dict(self):
        return {
            "userid":self.userid,
            "username": self.username,
            "full_name": self.full_name,
            "biography": self.biography,
            "postscount": self.postscount,
            "profile_picurl": self.profile_picurl,
            "followingcount": self.followingcount,
            "endcursor": self.endcursor,
            'followedby':self.followedby,
            "posts": [post.to_dict() for post in self.posts]
        }


class Reel():
    def __init__(self,reel_caption,reel_thumbnail,reel_src,reel_code,reel_likes,reel_plays):
      self.reel_caption=reel_caption
      self.reel_thumbnail=reel_thumbnail
      self.reel_src=reel_src
      self.reel_code=reel_code
      self.reel_likes=reel_likes
      self.reel_plays=reel_plays

    def to_dict(self):
        return {
               "reelcaption":self.reel_caption,
               "reelthumbnail":self.reel_thumbnail,
               "reelsrc":self.reel_src,
               "reelcode":self.reel_code,
               "reellikes":self.reel_likes,
               "reelplays":self.reel_plays
        }

from flask import Flask, render_template

app = Flask(__name__)

birthday = {
    "name": "luqman",
    "date": "23rd October 2026",
    "title": "Happy Birthday,",
    "subtitle": "sayang.",
    "intro": (
        "I made this little corner of the internet "
        "just for you."
    ),

    # ====================================
    # BIRTHDAY LETTER
    # ====================================

    "letter": [
        """happy birthday, sayang.""",

        """first of all, happy birthday to you. i hope today reminds you of how special you are, not just to me, but to everyone who's lucky enough to know you. i wish i could be there with you to celebrate your day, see your smile, and make more little memories together. but for now, i hope this little website can make you feel a little closer to me, even when we're miles apart.""",

        """honestly, i'm really glad that life somehow brought us to each other. out of all the people in this world, it's crazy to think that we ended up meeting and becoming a part of each other's lives. maybe it hasn't been that long, and there's still so much we have yet to learn about each other, but i'm genuinely happy that i get to know you, little by little, every day. and if there's one thing i want you to know, it's that i'm grateful for you, even in the simplest ways.""",

        """on your special day, i hope life treats you kindly. i hope all the things you've been working so hard for slowly find their way to you. i hope you get to see your efforts turn into something beautiful, and that all the dreams you've been keeping to yourself become things you can finally celebrate. i know you have your own responsibilities, things to figure out, and days when everything feels a little too much. i might not always know exactly what you're going through, but i hope you never feel like you have to figure everything out on your own.""",

        """please don't forget to take care of yourself, okay? you spend so much time doing things for your future, and i hope you remember that you deserve to enjoy the present, too. you don't always have to be productive, you don't always have to have everything figured out, and you don't have to be okay all the time. you're allowed to rest, to have bad days, and to take things slowly. i'm proud of you not only for the things you achieve, but also for the person you are and the effort you put into becoming who you want to be.""",

        """and as your partner, i hope i can be someone who makes life feel a little lighter for you. someone you can talk to about the good things, the bad things, the random things that happen during your day, or even the things you don't know how to explain yet. i may not always have the right advice or the perfect words to say, but i'll always try to listen and understand. you never have to pretend that everything is fine just because you don't want me to worry. i'd rather know what's on your mind and be there for you than have you carry everything by yourself.""",

        """thank you for being you, sayang. thank you for coming into my life and giving me someone new to care about, support, and share little pieces of my day with. i hope you know that i'll always be cheering for you, even when things don't go according to plan. i'll be happy to celebrate your wins, remind you of how far you've come when you feel stuck, and encourage you to keep going when the road gets difficult. not because i expect you to be perfect, but because i believe you deserve to see yourself achieve the things you've been dreaming of.""",

        """so, here's to another year of your life. more opportunities, more happiness, more growth, more reasons to smile, and more moments that make you feel grateful to be here. i hope this year brings you closer to the life you've always wanted, and i hope you find happiness in the little things along the way, too.""",

        """happy birthday again, sayang. i hope this new chapter is kind to you. keep chasing your dreams, keep being the person you want to become, and don't forget that somewhere out here, there's someone who's genuinely rooting for you.""",

        """i'm really happy it's you. and i hope you have the happiest birthday."""
    ],

    # ====================================
    # ALL MY WISHES
    # ====================================

    "wishes": [
        {
            "number": "01",
            "title": "For your happiness",
            "text": (
                "I hope you find happiness in the "
                "smallest moments, even on ordinary days."
            )
        },
        {
            "number": "02",
            "title": "For your dreams",
            "text": (
                "May every step you take bring you "
                "closer to the life you've always wanted."
            )
        },
        {
            "number": "03",
            "title": "For your peace",
            "text": (
                "I hope life treats you gently, "
                "and that you always have a place "
                "where you can feel at ease."
            )
        },
        {
            "number": "04",
            "title": "For us",
            "text": (
                "And selfishly, I hope I get to "
                "celebrate many more birthdays with you."
            )
        }
    ],

    
    # ====================================
    # SONGS THAT REMIND ME OF YOU
    # ====================================

    "songs": [
        {
            "title": "Cinderella",
            "artist": "Mac Miller (feat. Ty Dolla $ign)",
            "note": "this song always reminds me of you (iconic banget jujur)",
            "file": "music/cinderella.mp3"
        },
        {
            "title": "Begin Again",
            "artist": "Taylor Swift",
            "file": "music/beginagain.mp3"
        },
        {
            "title": "Moonlight",
            "artist": "Ariana Grande",
            "file": "music/moonlight.mp3"
        },
        {
            "title": "Sure Thing",
            "artist": "Miguel",
            "file": "music/surething.mp3"
        }
    ],


    # ====================================
    # FINAL MESSAGE
    # ====================================

    "ending": (
        "No matter how many birthdays come and go, "
        "I hope you always know that someone out "
        "there is incredibly proud of you. "
        "And that someone is me."
    ),

    "signature": "With love, rapika."
}


# ====================================
# FLASK ROUTES
# ====================================

@app.route("/")
def home():
    return render_template(
        "index.html",
        data=birthday
    )


# ====================================
# RUN APPLICATION
# ====================================

if __name__ == "__main__":
    app.run(debug=True)

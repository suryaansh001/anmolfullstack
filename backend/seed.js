const mongoose = require('mongoose');
const Content = require('./src/models/Content');
const User = require('./src/models/User');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/akshar';

const seedData = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Create sample users
    const users = [];
    const userList = [
      {
        name: 'Suryaansh Sharma',
        email: 'suryaansh@akshar.io',
        passwordHash: 'hashed_password_0',
        languages: ['Hindi', 'English', 'Tamil'],
        achievements: ['Rising Poet', 'Community Voice'],
      },
      {
        name: 'Aarav Mehta',
        email: 'aarav@akshar.io',
        passwordHash: 'hashed_password_1',
        languages: ['Hindi', 'English', 'Gujarati'],
        achievements: ['Monsoon Laureate', 'Sahitya Rising Voice'],
      },
      {
        name: 'Nila Krishnan',
        email: 'nila@akshar.io',
        passwordHash: 'hashed_password_2',
        languages: ['Tamil', 'English'],
        achievements: ['Indie Lyrics Award', 'Southern Script Circle'],
      },
      {
        name: 'Riya Das',
        email: 'riya@akshar.io',
        passwordHash: 'hashed_password_3',
        languages: ['Bengali', 'English', 'Hindi'],
        achievements: ['Bengal Story Guild', 'New Voices Fellowship'],
      },
      {
        name: 'Kavya Patel',
        email: 'kavya@akshar.io',
        passwordHash: 'hashed_password_4',
        languages: ['Gujarati', 'Hindi', 'English'],
        achievements: ['Scriptroom Select', 'Festival Finalist'],
      },
    ];

    for (const userData of userList) {
      try {
        const user = await User.create(userData);
        users.push(user);
      } catch (err) {
        console.warn(`Skipped user "${userData.name}":`, err.message);
      }
    }

    console.log(`Created ${users.length} users`);

    // Create sample content
    const contentData = [
      {
        title: 'मिट्टी की खुशबू',
        genre: 'Monsoon',
        language: 'Hindi',
        contentType: 'poem',
        authorId: users[0]._id,
        tags: ['monsoon', 'earth', 'rain', 'longing'],
        quillDelta: {
          ops: [
            {
              insert:
                'बारिश की पहली बूँद ने मिट्टी से कहा — आज फिर मिलेंगे, थोड़ी देर ठहर जाओ।\n',
            },
          ],
        },
        bookmarkCount: 1240,
        ratingSum: 4.8 * 100,
        ratingCount: 100,
      },
      {
        title: 'தனிமையின் பாடல்',
        genre: 'Romance',
        language: 'Tamil',
        contentType: 'lyrics',
        authorId: users[1]._id,
        tags: ['solitude', 'song', 'loneliness', 'night'],
        quillDelta: {
          ops: [
            {
              insert:
                'இரவைத் தழுவும் காற்றில், உன் பெயர் ஒரு மெலடி; இதயம் ஒவ்வொரு தாளத்திலும் உன்னை மீண்டும் பாடுகிறது।\n',
            },
          ],
        },
        bookmarkCount: 910,
        ratingSum: 4.7 * 100,
        ratingCount: 100,
      },
      {
        title: 'চাঁদের চিঠি',
        genre: 'Letters',
        language: 'Bengali',
        contentType: 'poem',
        authorId: users[2]._id,
        tags: ['letters', 'moon', 'melancholy', 'night'],
        quillDelta: {
          ops: [
            {
              insert:
                'একটা চিঠি লিখেছিলাম তোমায়, কিন্তু চাঁদ পড়ে নিল আগে; রাত জুড়ে তাই জোৎস্না ভেজা বাক্য।\n',
            },
          ],
        },
        bookmarkCount: 845,
        ratingSum: 4.7 * 100,
        ratingCount: 100,
      },
      {
        title: 'The Last Letter from Bombay',
        genre: 'Historical Fiction',
        language: 'English',
        contentType: 'story',
        authorId: users[2]._id,
        tags: ['historical', 'bombay', 'letters', 'nostalgia'],
        quillDelta: {
          ops: [
            {
              insert:
                'She folded the paper twice, the way her father had taught her, and pressed it inside the train ticket sleeve.\n',
            },
          ],
        },
        bookmarkCount: 2104,
        ratingSum: 4.9 * 100,
        ratingCount: 100,
      },
      {
        title: 'પવનનો પત્ર',
        genre: 'Village Life',
        language: 'Gujarati',
        contentType: 'story',
        authorId: users[3]._id,
        tags: ['village', 'wind', 'letters', 'memory'],
        quillDelta: {
          ops: [
            {
              insert:
                'પવન આજે પણ એ જ વાડીએ અટકે છે, જ્યાં તું નામ લખ્યું હતું. ગામે યાદોને વેણીમાં બાંધી રાખી છે।\n',
            },
          ],
        },
        bookmarkCount: 730,
        ratingSum: 4.6 * 100,
        ratingCount: 100,
      },
      {
        title: 'Monsoon, Interrupted',
        genre: 'Drama',
        language: 'English',
        contentType: 'screenplay',
        authorId: users[3]._id,
        tags: ['screenplay', 'drama', 'monsoon', 'city'],
        quillDelta: {
          ops: [
            {
              insert:
                'INT. SMALL CAFE — RAJ stares out the window. A cup of cutting chai trembles as thunder rolls over the old city.\n',
            },
          ],
        },
        bookmarkCount: 678,
        ratingSum: 4.6 * 100,
        ratingCount: 100,
      },
      {
        title: 'Ghazal for a Returning Train',
        genre: 'Ghazal',
        language: 'English',
        contentType: 'lyrics',
        authorId: users[0]._id,
        tags: ['ghazal', 'train', 'return', 'longing'],
        quillDelta: {
          ops: [
            {
              insert:
                'In every station lamp, your shadow waits for dawn. I learn to rhyme my longing with the whistle of return.\n',
            },
          ],
        },
        bookmarkCount: 562,
        ratingSum: 4.5 * 100,
        ratingCount: 100,
      },
      {
        title: 'ફિલ્મના અંતે વરસાદ',
        genre: 'Romantic Drama',
        language: 'Gujarati',
        contentType: 'screenplay',
        authorId: users[3]._id,
        tags: ['cinema', 'rain', 'romance', 'drama'],
        quillDelta: {
          ops: [
            {
              insert:
                'INT. સિંગલ સ્ક્રીન સિનેમા — અંતિમ દૃશ્ય પછી પણ બેસી રહેલો પ્રેમ. બહાર વરસાદ પલકોથી પત્ર લખે છે।\n',
            },
          ],
        },
        bookmarkCount: 812,
        ratingSum: 4.8 * 100,
        ratingCount: 100,
      },
      {
        title: 'you are the poem i never write',
        genre: 'Romance',
        language: 'English',
        contentType: 'poem',
        authorId: users[0]._id,
        tags: ['unrequited', 'love', 'dreams', 'poetry'],
        quillDelta: {
          ops: [
            {
              insert:
                'you are the poem i never write,\nyet read a thousand times each night.\nwith reality, each second i fight\nwhen you are not by my side.\n\nlaughing softly at every sight,\nyet beneath my heart lives a quiet fright—\nof losing you… though you were never mine,\nstill, i live just to see you shine.\n',
            },
          ],
        },
        bookmarkCount: 450,
        ratingSum: 4.7 * 100,
        ratingCount: 100,
      },
      {
        title: 'kya hota agar ishq mei dil kabhi toot-ta hi nhi',
        genre: 'Romance',
        language: 'Hindi',
        contentType: 'poem',
        authorId: users[0]._id,
        tags: ['love', 'heartbreak', 'dreams', 'destiny'],
        quillDelta: {
          ops: [
            {
              insert:
                'kya hota agar ishq mei dil kabhi toot-ta hi nhi\njo mohabbat ho tumhei kisi se , woh kabhi tumse rooth-ta hi nhi\nkhwabon ki duniya mei mai ek  aisa sheher basata\njo kismat ki kalam aaye mere haath mei , toh main snape ko lily se milwata\n',
            },
          ],
        },
        bookmarkCount: 380,
        ratingSum: 4.6 * 100,
        ratingCount: 100,
      },
      {
        title: 'Main apne ghaaw badaya krta tha',
        genre: 'Romance',
        language: 'Hindi',
        contentType: 'poem',
        authorId: users[1]._id,
        tags: ['heartbreak', 'love', 'loneliness', 'pain'],
        quillDelta: {
          ops: [
            {
              insert:
                'Main apne ghaaw badaya krta tha\nYeh kar uska haath bataya krta tha\nZakhm mere dil pe jo kiye the usne\nUski yaadon Main mera dil jalaya krta tha\n',
            },
          ],
        },
        bookmarkCount: 420,
        ratingSum: 4.8 * 100,
        ratingCount: 100,
      },
      {
        title: 'tu waqt bitana chahti thi',
        genre: 'Romance',
        language: 'Hindi',
        contentType: 'poem',
        authorId: users[2]._id,
        tags: ['love', 'time', 'separation', 'heartbeat'],
        quillDelta: {
          ops: [
            {
              insert:
                'tu waqt bitana chahti thi,\nmai waqt rokna chahta tha\n\ntu yaadein bhulana chahti thi,\nmai yaad ban jaana chahta tha\n\ntu anjaam chahti thi,\nmai kahaani banna chahta tha\n',
            },
          ],
        },
        bookmarkCount: 310,
        ratingSum: 4.5 * 100,
        ratingCount: 100,
      },
      {
        title: 'we were so close to forever',
        genre: 'Romance',
        language: 'English',
        contentType: 'poem',
        authorId: users[1]._id,
        tags: ['love', 'forever', 'goodbye', 'loss'],
        quillDelta: {
          ops: [
            {
              insert:
                'we were so close to forever\nfought the storms but failed to meet ever\n\ntears rolling silently.. no sound escapes\nevery possibility is what my heart reshapes\n\ni ask myself, over and over—why?\nhow did we fade without goodbye?\n',
            },
          ],
        },
        bookmarkCount: 290,
        ratingSum: 4.7 * 100,
        ratingCount: 100,
      },
    ];

    // Insert content without collation conflict
    const contents = [];
    for (const data of contentData) {
      try {
        const content = await Content.create(data);
        contents.push(content);
      } catch (err) {
        console.warn(`Skipped content "${data.title}":`, err.message);
      }
    }
    console.log(`Created ${contents.length} content pieces`);

    console.log('✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
};

seedData();

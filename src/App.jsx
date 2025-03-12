import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { Menu } from 'lucide-react';
import './App.css';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [];
  for (let i = 1; i <= 15; i++) {
    images.push(`/${i}.jpg`);
  }

  const closeFullscreen = () => setSelectedImage(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeFullscreen();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="p-4">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Thumbnail ${index + 1}`}
            className="cursor-pointer w-full h-48 rounded-lg shadow-md hover:scale-105 transition"
            onClick={() => setSelectedImage(src)}
          />
        ))}
      </div>
  
      {selectedImage && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50"
          onClick={closeFullscreen}
        >
          <img
            src={selectedImage}
            alt="Fullscreen"
            className="max-w-full max-h-full rounded-lg"
          />
        </div>
      )}
    </div>
  );
  
}


const Emoji = ({page}) => {
  switch (page) {
    case 'cover':
      return "📖";
    case 'thanks':
      return "💖";
    case 'introduction':
      return "";
    case 'essays':
      return "📝";
    case 'spokenHebrew':
      return "🗣";
    case 'linguistics':
      return "🧠";
    case 'exams':
      return "📋";
    case 'videos':
      return "🎥";
    case 'vocabulary':
      return "🏷️";
    case 'experiences':
      return "🌟";
    case 'conclusion':
      return "✅";
    default:
      return;
  }
}

const Timeline = () => {
  const [scrollPercent, setScrollPercent] = useState(0);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const scrollProgress = (scrollTop / (docHeight - windowHeight)) * 100;
    setScrollPercent(scrollProgress);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-2 bg-gray-300 z-60">
      <div
        className="bg-blue-500 h-full"
        style={{ width: `${scrollPercent}%`, transition: 'width 0.1s ease-out' }}
      ></div>
    </div>
  );
};

const Section = ({ id, title, children }) => (
  <section
    id={id}
    className="w-full min-h-screen py-20 px-6 md:pr-[20%] md:pl-10 bg-white text-gray-900 flex flex-col justify-start items-end"
  >
    <div className="max-w-screen-md text-right">
      <h2 className="text-4xl font-semibold text-black-500 mb-5 font-hebrew" dir="rtl"><Emoji page={id} /> {title}</h2>
      <p className="text-xl font-hebrew" dir="rtl">{children}</p>
    </div>
  </section>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* mobile menu */}
      <button
        className="fixed top-4 right-4 md:hidden bg-blue-500 p-2 rounded-lg shadow-md z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu size={28} color="white" />
      </button>

      {/* desktop vs mobile */}
      <div
        className={`fixed top-0 right-0 h-full bg-gray-100 shadow-lg flex flex-col space-y-4 p-4 z-40 transition-transform duration-300 
          ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:translate-x-0 md:w-[14%]`}
      >
        {['cover', 'thanks', 'introduction', 'essays', 'spokenHebrew', 'linguistics', 'exams', 'videos', 'vocabulary', 'experiences', 'conclusion'].map((section) => (
          <Link
            key={section}
            to={section}
            smooth={true}
            duration={500}
            className="text-xl font-semibold text-gray-700 hover:text-blue-500 transition-colors duration-200 cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            {section === 'cover' ? 'שער' :
             section === 'thanks' ? 'תודות' :
             section === 'introduction' ? 'מבוא' :
             section === 'essays' ? 'חיבורים' :
             section === 'spokenHebrew' ? 'עברית מדוברת' :
             section === 'linguistics' ? 'לימודי לשון' :
             section === 'exams' ? 'דוגמאות לבחינות' :
             section === 'videos' ? 'סרטונים' :
             section === 'vocabulary' ? 'אוצר מילים' :
             section === 'experiences' ? 'חוויות' : 'סיכום'}
          </Link>
        ))}
      </div>
    </>
  );
};

const App = () => {
  return (
    <div className="relative">
      <Timeline />
      <Navbar />
      <div className="flex-1 ml-auto pr-0 pt-20 mt-16">
        <Section id="cover" title="שער">
          <p><b>שם:</b> זוהדי גאוי</p>
          <p><b>כיתה:</b> י"א 1</p>
          <p><b>בית הספר:</b> עתיד אל-אהליה אום אל פחם</p>
          <p><b>מורה:</b> מחמוד מחאמיד</p>
          <p><b>ת.ז:</b> 332234475</p>
        </Section>
        <Section id="thanks" title="תודות">
        אני רוצה להודות מכל הלב למורה שלי, מחמוד מחאמיד, על ההשקעה, הסבלנות והמסירות לאורך הדרך. השיעורים שלך לא רק חיזקו את הידע שלי בעברית, אלא גם נתנו לי ביטחון לדבר, לכתוב ולהביע את עצמי בצורה טובה יותר. תודה על התמיכה, ההכוונה והעזרה בכל שלב, ועל כך שתמיד דחפת אותי לשאוף גבוה יותר.
        </Section>
        <Section id="introduction" title="מבוא">
        <p>תיק העבודות הזה הוא בעצם סיכום של הדרך שלי בלימודי העברית בשנתיים האחרונות. במהלך הזמן הזה, למדתי לא רק מילים וכללים דקדוקיים, אלא גם איך להתבטא בצורה טובה יותר בכתיבה ובדיבור. היו רגעים שהעברית הרגישה קלה וזורמת, אבל גם רגעים מאתגרים שבהם הייתי צריך להתאמץ יותר כדי להבין ולהשתפר.</p>
        בתיק הזה אספתי עבודות, חיבורים, משימות, וסרטונים שיצרתי – כל אלו משקפים את הדרך שעברתי.
        </Section>
        <Section id="essays" title="חמשת החיבורים + רפלקציה">
          <a href="https://docs.google.com/document/d/1EzXONw1Fe5P1zoneDtjm-5p7c_JIOXX7sKTJhJzPqDk/edit?usp=sharing" className='font-medium text-blue-600 underline text-blue-500 hover:no-underline' target='_blank'>חיבורים למועד קיץ 2025</a><br/>
          <p>כתיבת החיבורים הייתה משימה מאתגרת אך משמעותית עבורי. התהליך דרש ממני לנסח רעיונות בצורה ברורה, להשתמש בשפה עשירה ולשמור על מבנה נכון של חיבור.</p><br/>

<p>בהתחלה, היה לי לא קל לארגן את המחשבות שלי ולהביע אותן בצורה מסודרת, אבל עם הזמן למדתי כיצד לבנות חיבור בצורה נכונה לפי סוג החיבור. המשימה הזו גם שיפרה את היכולת שלי להביע דעה בכתב בעברית, ולחזק את הביטחון שלי בכתיבה.</p>
        </Section>
        <Section id="spokenHebrew" title="עברית מדוברת">
          <p>
            <h3 className='text-xl'>1. <a href="https://docs.google.com/document/d/1tquzsVFfC3NjQbhdLS28s0Wi7icNoJKKPooUlWih0mw/edit?usp=sharing" className='font-medium text-blue-600 underline text-blue-500 hover:no-underline' target='_blank'>נושאים לבגרות עברית מדוברת 2024-2025</a>
            </h3>
          </p>
          <p>
            <h3 className='text-xl'>2. <a href="https://productplayer.cet.ac.il/ivrit4highschool/70e0f651-7a84-48b6-a928-d367f939998c_f2744edd-7502-49c2-8a06-2b93c946bff7" className='font-medium text-blue-600 underline text-blue-500 hover:no-underline' target='_blank'>משימת אופק #1</a>
            </h3>
          </p>
          <p>
            <h3 className='text-xl'>3. <a href="https://lo.cet.ac.il/player/?task=9dbef6bb-1595-45c1-a514-a3493816d092" className='font-medium text-blue-600 underline text-blue-500 hover:no-underline' target='_blank'>משימת אופק #2</a>
            </h3>
          </p>
          <p>
            <h3>4. <a href='https://lo.cet.ac.il/player/?task=e07a1362-1be6-476e-9f24-545d3c2df655' className='font-medium text-blue-600 underline text-blue-500 hover:no-underline' target='_blank'>משימת אופק #3</a>
            </h3>
          </p><br/>
          <p>
          במהלך הלמידה, התמודדתי עם שלוש משימות באתר אופק שדרשו ממני להשתמש בעברית מדוברת. בהתחלה, זה היה מאתגר – לדבר בצורה שוטפת, להשתמש בביטויים הנכונים ולהתנסח בצורה טבעית. אך עם כל משימה, הרגשתי שיפור ביכולת הדיבור והביטחון שלי.
          </p>
        </Section>
        <Section id="linguistics" title="לימודי הלשון">
          <p>
            <h3 className='text-xl'><a href="https://drive.google.com/file/d/1cEMWESu5-dFNvZs8BYvBSUp_7Y_3_vW4/view" className='font-medium text-blue-600 underline text-blue-500 hover:no-underline' target='_blank'>דרכי התצורה של השם:</a> נושא מעניין שהראה לי איך נוצרים שמות בשפה העברית. למדתי לזהות משקלים שונים ולהבין כיצד מילים נגזרות זו מזו.
            </h3>
          </p><br/>
          <p>
            <h3 className='text-xl'><a href="https://drive.google.com/file/d/1lyHWadDR-4urx8gAz6nlg9ZooJx62XgY/view" className='font-medium text-blue-600 underline text-blue-500 hover:no-underline' target='_blank'>תרגולי לשון שאלון 14371:</a> התרגולים עזרו לי לחדד את ההבנה בנושאי הלשון ולהתכונן היטב למבחן. דרך התרגול הבנתי אילו נושאים דורשים חיזוק ואיך להשתפר.
            </h3>
          </p><br/>
          <p>
            <h3 className='text-xl'><a href="https://drive.google.com/file/d/15nN6ernwcyvkQaLE6HFfj4TwIberbdxK/view" className='font-medium text-blue-600 underline text-blue-500 hover:no-underline' target='_blank'>טבלת כל הבניינים ותופעות התפעל:</a> הבניינים תמיד היו מאתגרים, אבל המורה יצר טבלה מסודרת שעזרה לי לזכור את המבנים השונים ולהבין את תופעות ההתפעל בצורה ברורה יותר.
            </h3>
          </p><br/>
          <p>
            <h3 className='text-xl'><a href="https://drive.google.com/file/d/1VcROyFFdHKaojCpzil-kPpTj5UyaNY58/view" className='font-medium text-blue-600 underline text-blue-500 hover:no-underline' target='_blank'>מצגת השוואים:</a> נושא מורכב אך הכרחי להבנת ההגייה והכתיבה התקנית.
            </h3>
          </p><br/>
          <p>
            <h3 className='text-xl'><a href="https://drive.google.com/file/d/1EnBRhHm2o13ErAtBqDETgkn8Z0lNpvk9/view" className='font-medium text-blue-600 underline text-blue-500 hover:no-underline' target='_blank'>מצגת הדגשים:</a> לימוד הדגשים חיזק את ההבנה שלי על הבדל בין אותיות דגושות לרפות והשפעתן על ההגייה. זה נושא קטן אך חשוב בדיוק הלשוני.
            </h3>
          </p>
        </Section>
        <Section id="exams" title="דוגמאות לבחינות + רפלקציה">
          <Gallery />
        </Section>
        <Section id="videos" title="סרטונים">
          <h3 className='text-xl font-bold'>סרטון מי אני</h3>
          <br/>
          <video src="/Video.mov" class="h-full w-full rounded-lg" controls></video><br/>
          <p>סרטון "מי אני" היה המשימה הרצינית הראשונה שלי בעברית מדוברת, והוא סימן שלב חשוב בתהליך הלמידה שלי. זו הייתה הפעם הראשונה שבה נדרשתי לדבר מול מצלמה בעברית, להציג את עצמי באופן ברור ולשים לב גם להיגוי וגם לשטף הדיבור שלי.</p><br/>

<p>בהתחלה, זה היה קשה מאוד. דיבור חופשי בעברית עדיין לא היה טבעי עבורי, ולכן מצאתי את עצמי מסתכל הרבה על המחברת כדי לזכור מה לומר ואיך לנסח את המשפטים נכון. היה לי קשה לדבר ברצף בלי לעצור, כי זו הייתה חוויה חדשה עבורי, והרגשתי צורך להיאחז בטקסט הכתוב כדי לא להתבלבל.</p><br/>

<p>עם זאת, למרות האתגר, המשימה הזו הייתה מאוד חשובה להתקדמות שלי. היא גרמה לי להכיר טוב יותר את החולשות שלי בדיבור ולעבוד על שיפור ההיגוי והביטחון שלי.</p>
        </Section>
        <Section id="vocabulary" title="אוצר מילים חשוב">
          <p>
            <h3 className='text-xl'><a href="https://docs.google.com/spreadsheets/d/14FRupAtX_ljK8COBzKUYBlbe972_steStWI5ye6mmeY/edit?usp=sharing" className='font-medium text-blue-600 underline text-blue-500 hover:no-underline' target='_blank'>אוצר מלים</a>
            </h3>
          </p>
        </Section>
        <Section id="experiences" title="חוויות שלא אשכח">
        <p>אחת החוויות הזכורות לי ביותר משיעורי העברית הייתה "גלגל המזל" – גלגל שסובבנו בתחילת השיעור כדי לענות ולספר איך עבר עלינו סוף השבוע. זה היה תרגול נהדר, כי הוא עזר לנו להתחיל את השיעור בצורה קלילה, וגם שיפר את יכולת הדיבור החופשי שלנו בעברית.</p><br/>

<p>בנוסף, נהניתי מאוד מהפעילויות שהתקיימו מחוץ לכיתה, שם תרגלנו עברית מדוברת בסביבה פתוחה. זה היה שינוי מרענן משיעורי הכיתה הרגילים, ועזר לי להרגיש יותר בנוח להשתמש בשפה בסיטואציות טבעיות. בזכות הפעילויות הללו, הרגשתי שיפור ביכולת שלי להתבטא בצורה שוטפת יותר.</p><br/>
        </Section>
        <Section id="conclusion" title="סיכום ורפלקציה">
        <p>לימוד העברית בבית הספר היה מסע מלא באתגרים, למידה וצמיחה. לאורך השנים, התמודדתי עם טקסטים מורכבים, דקדוק ומשימות שונות, אבל תמיד ניסיתי להשקיע את המקסימום בכל משימה. אני מאמין שכאשר משקיעים באמת – גם התוצאות טובות יותר, וההרגשה של סיפוק היא עצומה.</p>
<br/>
<p>בניית התלקיט הייתה חוויה ייחודית, במיוחד בגלל שהחלטתי ליצור אותו כשאתר אינטראקטיבי באמצעות תכנות. זה היה תהליך מאתגר אך מתגמל, ששילב בין שני עולמות שאני אוהב – השפה העברית והתכנות. מעבר ללמידה על עברית, הבנייה חיזקה את היכולות הטכניות שלי.</p>
<br/>
<p>לסיכום, העבודה על התלקיט גרמה לי להסתכל אחרת על הדרך שעברתי בלימוד השפה, והוכיחה לי עד כמה אני אוהב להשקיע וליצור דברים ברמה גבוהה.</p>
        </Section>
      </div>
    </div>
  );
};

export default App;

import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import "../assets/css/card.css";
import { Link } from 'react-router-dom'; 

function Card() {
  const [cardClass, setCardClass] = useState("");
  const [isCardOpened, setIsCardOpened] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // New: Track current page (1-4)
  const timerRef = useRef(null);

  const pages = [
    {
      title: "Page 1: Happy Birthday!",
      content: [
        "Selamat Ulang Tahun ya, Sekar Sayangkuuu!",
        "Hari ini adalah hari kamu Berada di dunia ini. Hari ini mungkin cuma datang setahun sekali, tapi buat saya, keberadaanmu adalah hal indah yang selalu pengen ku syukuri setiap hari-nya.",
        "Sampai saat ini saya tidak menyangka kalau penantian bertahun lamanya, saya diizinkan semesta buat punya kamu.",
        "Perempuan manis yang senyumnya selalu menenangkan hatiku dan Perempuan Ceria yang diam-diam jadi rumah paling nyaman buat lelahku. "
      ]
    },
    {
      title: "Page 2: Apologies",
      content: [
      "Di hari spesial-mu, saya juga ingin meminta maaf atas segala sikap dan kesalahan-ku selama kita bersama.",
      "Saya sadar mungkin masih banyak kurangnya dalam ngertiin kamu, dalam bersikap dewasa atau kadang tanpa sadar bikin hatimu kecewa :(",
      "Tapi percayalah, sediki pun tidak ada niatan buat nyakitin kamu. Saya cuma seorang yang lagi belajar bagaimana menjadi yang terbaik untukmu :)",
      "Terima kasih Karena sampai saat ini kamu masih bertahan, masih mau percaya, dan masih pilih saya di tengah segala kurangku :("
    ]
    },
    // {
    //   title: "Page 3: Memories",
    //   content: [
    //     "Remember that time we...",
    //     "Another fun memory here.",
    //     "More lorem ipsum text.",
    //     "Signed: Jane Doe"
    //   ]
    // },
    {
      title: "Page 3: Wishes",
      content: [
        "Sekar sayangku, saya harap di umur baru ini kamu di beri kesehatan, kebahagiaan, dan hati yang tenang. Semoga senyum dan tawa manis-mu selalu ada dan hal baik pelan-pelan menghampiri hidupmu.",
        "Saya juga harap hubungan kita selalu tumbuh jadi sesuatu yang lebih indah, lebih dewasa, dan lebih kuat serta lebih baik hari demi hari :)",
        "Saya nda tau masa depan akan sejauh apa membawa kita, tapi untuk sekarang dan seterusnya, izinkan saya terus bersama di sampingmu, temenin setiap cerita, tawa, marah, dan air mata-mu."
      ]
    },
    {
      title: "Page 4: Final Message",
      content: [
        "Sekali Lagi... Selamat ulang tahun sayangkuuu!",
        "Terima kasih karena akhirnya kita dipertemukan bukan sekedar dua orang yang saling menunggu, tapi juga dua hati yang akhirnya saling memiliki.",
        "Once more... i always love you.",
        " :)",
        "Signed: Ivan Ramadhan"
      ]
    }
  ];

  const toggleCard = () => {
    if (cardClass === "" || cardClass === "close-half") {
      setCardClass("open-half");
      setIsCardOpened(true); 
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setCardClass("open-fully");
        timerRef.current = null;
      }, 1000);
    } else {
      setCardClass("close-half");
      setIsCardOpened(false); // Reset to closed state
      setCurrentPage(1); // Reset to page 1 when closing
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setCardClass("");
        timerRef.current = null;
      }, 1000);
    }
  };

    // New: Navigation functions
  const nextPage = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentPageData = pages[currentPage - 1]; // Get data for current page

  return (
    <div className="min-h-screen flex flex-col items-center justify-center overflow-clip">
    <div className="w-[400px]  h-screen flex flex-col items-center justify-center">
      <motion.div
          initial={{ opacity: 0, visibility: "hidden" }}
          animate={{ opacity: 1, visibility: "visible" }}
          transition={{ duration: 1.2 }}
        >
          <div id="card" className={`${cardClass}`} onClick={toggleCard}>     
            <div id="card-inside">
              <div className="wrap">
                {/* New: Display current page title and content */}
                <h2>{currentPageData.title}</h2>
                {currentPageData.content.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div id="card-front">
              <div className="wrap">
                <h1>Happy Birthday!</h1>
              </div>
            </div>
          </div>
        </motion.div>

      {/* <motion.div  initial={{ opacity: 0, visibility: "hidden" }}
          animate={{ opacity: 1, visibility: "visible" }}
          transition={{duration: 1.2}}>
      <div id="card" className={`${cardClass}`} onClick={toggleCard}>     
        <div id="card-inside">
          <div className="wrap">
            <p>Happy Birthday, John Doe!</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque delectus dolore recusandae eveniet dicta. Corrupti.</p>
            <p>
              I hope you have a very blessed birthday!
            </p>
            <p>
             Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, cum.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <p className="signed">Jane Doe</p>
          </div>
        </div>

        <div id="card-front">
          <div className="wrap">
            <h1>Happy Birthday!</h1>
          </div>
        </div>
    </div>

      </motion.div> */}

        {/* New: Navigation buttons (only show when card is open) */}
        {isCardOpened && (
          <motion.div 
            className="-mt-[3rem]" 
            initial={{ opacity: 0, visibility: "hidden" }}
            animate={{ opacity: 1, visibility: "visible" }}
            transition={{ duration: 1.2 }}
          >
            <div className="flex space-x-4">
              {/* Previous button (hidden on page 1) */}
              {currentPage > 1 && (
                <button 
                  onClick={prevPage} 
                  className="px-4 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600"
                >
                  Previous
                </button>
              )}
              
              {/* Next button (hidden on page 4) */}
              {currentPage < pages.length && (
                <button 
                  onClick={nextPage} 
                  className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                >
                  Next
                </button>
              )}
              
              {/* Next Page link (only on final page) */}
              {currentPage === pages.length && (
                <Link to='/cake'>
                  <p className="px-4 py-2 bg-customBlue text-white font-medium text-base rounded-full hover:bg-blue-600">
                    Next Page
                  </p>
                </Link>
              )}
            </div>
          </motion.div>
        )}

    {/* prone to bugs */}
      {/* {isCardOpened && (
        <motion.div className="-mt-[3rem]" initial={{ opacity: 0, visibility: "hidden" }}
        animate={{ opacity: 1, visibility: "visible" }}
        transition={{duration: 1.2}}> 
        <Link to ='/cake'>
        <p className="-mt-[4rem] px-7 py-3 bg-customBlue text-white font-medium text-base rounded-full hover:bg-blue-600">
            Next Page
          </p>
        </Link>
            
        </motion.div>
        
        )} */}

    </div>
    
    </div>
    
  );
}

export default Card;
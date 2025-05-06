// Slideshow.jsx

import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { motion, AnimatePresence } from 'framer-motion';

// Slideshow Data
const slideshowData = [
  {
    id: 1,
    image: '/images/slide1.jpg',
    title: 'Natural Cosmetic Products',
    description: `Harnessing the potency of nature to nourish and rejuvenate your skin, hair, and overall well-being.

KEY INGREDIENTS
• Herbal Extracts
• Essential Oils
• Natural Moisturizers

BENEFITS OF NATURAL COSMETIC PRODUCTS
• Gentle and Non-Irritating – Less likely to cause skin irritation and allergic reactions
• Nourishing and Rejuvenating – Locks in moisture, promotes healthy skin and hair
• Environmentally Friendly – Biodegradable and sustainable, reducing environmental impact
• Effective and Potent – Centuries-old use in addressing various skin and hair concerns

Experience the Power of Nature in Beauty.
Discover the benefits of natural cosmetic products and start your journey to healthier, more radiant skin and hair.`,
  },
  {
    id: 2,
    image: '/images/slide2.jpg',
    title: 'Celebrate Holi with Nature Vibrance',
    description: `Introducing our Natural Holi Colors, carefully crafted from flowers, seeds, and tubers. Our colors offer a safe, eco-friendly, and vibrant alternative to synthetic dyes.

WHY CHOOSE NATURAL HOLI COLORS?
• Safe and Gentle: Made from natural ingredients, reducing the risk of skin irritation and allergic reactions
• Eco-Friendly: Biodegradable and sustainable, minimizing environmental harm
• Vibrant and Long-Lasting: Our natural colors provide a rich and festive experience

JOIN THE MOVEMENT
Celebrate Holi with peace of mind, knowing you're choosing a more sustainable and skin-friendly option. Switch to our NATURAL Holi Colors and experience the joy of a vibrant and eco-friendly celebration.`,
  },
  {
    id: 3,
    image: '/images/slide3.jpg',
    title: 'Natural Farming Food Products',
    description: `Nourishing Your Body

We're passionate about bringing you the best of nature's bounty. Our natural farming food products are carefully crafted to provide wholesome nutrition, while promoting sustainable agriculture and reducing environmental impact.

BENEFITS OF NATURAL FARMING
• Chemical-Free: Our products are free from synthetic pesticides, herbicides, and fertilizers
• Nutrient-Rich: Our natural farming practices preserve the natural nutrients and flavors of our crops
• Sustainable: We believe in farming practices that promote soil health, biodiversity, and efficient water use

JOIN THE MOVEMENT
Choose our natural farming food products and experience the difference for yourself. Taste the freshness, feel the goodness.`,
  },
  {
    id: 4,
    image: '/images/slide4.jpg',
    title: 'Natural Farming Medicinal Plant Products',
    description: `Harnessing Nature's Healing Power

OUR PRODUCT RANGE
• Herbal Extracts: Concentrated plant extracts for various health benefits
• Botanical Powders: High-quality plant powders for pharmaceutical applications
• Herbal Oils: Natural oils extracted from medicinal plants for therapeutic use

KEY BENEFITS
• Chemical-Free: Our products are free from synthetic pesticides, herbicides, and fertilizers
• Potent and Effective: Our natural farming practices preserve the natural potency and effectiveness of our medicinal plants
• Sustainable: We believe in farming practices that promote soil health, biodiversity, and efficient water use

OUR MISSION
We're dedicated to cultivating high-quality medicinal plant products using natural farming practices. Our products are carefully crafted to promote health and wellness, while respecting the environment and promoting sustainability.`,
  },
  {
    id: 5,
    image: '/images/slide5.jpg',
    title: 'Herbal Teas',
    description: `Savor the Flavor of Nature’s Remedies
  
  Our herbal teas offer a caffeine-free, soothing experience crafted from nature's finest ingredients.
  
  KEY BENEFITS
  • Natural and Caffeine-Free – A healthy alternative for everyday refreshment  
  • Soothing and Calming – Reduces stress and anxiety  
  • Promotes Better Sleep – Supports restful nights  
  • Overall Wellness – Aids digestion, supports immunity, enhances memory, detoxifies liver, and more
  
  Discover your perfect blend and embrace the healing power of nature’s infusions.`,
  },
  {
    id: 6,
    image: '/images/slide6.jpg',
    title: 'Nutritional Food Products',
    description: `Wholesome and Delicious
  
  Enjoy our nutritious blend of honey, dried fruits, mixed nuts, and seeds – nature’s perfect snack.
  
  KEY INGREDIENTS
  • Honey, Almonds, Walnuts, Pecans, Raisins, Cranberries, Apricots, Sunflower Seeds
  
  BENEFITS
  • Energy Boost – Ideal for active lifestyles  
  • Rich in Fiber – Supports digestion  
  • Antioxidant-Rich – Protects against oxidative stress  
  • Heart Health – May lower cholesterol and blood pressure
  
  Snack smart with our delicious and nourishing blend.`,
  },
  {
    id: 7,
    image: '/images/slide7.jpg',
    title: 'Natural Farming Millets',
    description: `Healthy Grains for a Better Tomorrow
  
  Our millets are grown with care using natural farming practices to ensure purity and nutrition.
  
  BENEFITS
  • Sustainably Grown – No chemicals or artificial fertilizers  
  • Nutrient-Rich – High in fiber, protein, and minerals  
  • Gluten-Free – Ideal for sensitive diets  
  • Supports Digestion and Heart Health
  
  Rediscover traditional grains with our naturally grown millets.`,
  },
  {
    id: 8,
    image: '/images/slide8.jpg',
    title: 'Mixed Millet Powder',
    description: `The Power of Millets Combined
  
  Our multi-millet blend brings together the best of nature’s grains for a wholesome dietary boost.
  
  KEY FEATURES
  • Multi-Grain Mix – Rich in fiber and essential nutrients  
  • Easy to Digest – Gentle on the stomach  
  • Energy Boost – Sustained vitality throughout the day  
  • Uses – Perfect for porridge, java, ambali, and roti
  
  Start your day with our nourishing mixed millet powder.`,
  },
  {
    id: 9,
    image: '/images/slide9.jpg',
    title: 'Dried Tuber Vegetable Food',
    description: `Wholesome Goodness in Every Slice
  
  Our dried tuber vegetables offer a shelf-stable, nutrient-packed way to enjoy traditional roots.
  
  INGREDIENTS
  • Carrot, Beetroot, Radish, Taro Root, Tapioca, Sweet Potato
  
  BENEFITS
  • Convenient and Long-Lasting  
  • Rich in Vitamins and Fiber  
  • Versatile for Snacks and Meals
  
  Taste the earthy flavors of our dried tuber vegetable slices.`,
  },
  {
    id: 10,
    image: '/images/slide10.jpg',
    title: 'Dried Fruit Slices',
    description: `Nature’s Candy, Naturally Preserved
  
  Our dried fruit slices are delicious, healthy snacks made from carefully selected fruits.
  
  BENEFITS
  • Shelf-Stable and Ready-to-Eat  
  • Rich in Nutrients and Antioxidants  
  • Uses – Ideal for snacking, baking, cooking, or trail mix
  
  Enjoy guilt-free indulgence with our dried fruit slices.`,
  },
  {
    id: 11,
    image: '/images/slide11.jpg',
    title: 'Dried Leafy Vegetables',
    description: `Green Goodness, Preserved Naturally
  
  Our dried leafy greens retain their nutrition and flavor while offering convenient usage.
  
  INGREDIENTS
  • Spinach, Kale, Collard Greens, Amaranth, and more
  
  BENEFITS
  • Nutrient-Dense and Easy to Store  
  • Supports Energy, Skin, and Digestion  
  • Uses – Perfect for smoothies, soups, and baking
  
  Bring nature’s greens into your kitchen, any time of the year.`,
  },
  {
    id: 12,
    image: '/images/slide12.jpg',
    title: 'Leafy Vegetable Powders',
    description: `Concentrated Plant Nutrition
  
  Our powders provide a simple and powerful way to boost your meals with natural green nutrition.
  
  INGREDIENTS
  • Spinach, Kale, Amaranth, Sorrel, Collard Greens
  
  BENEFITS
  • Convenient and Nutrient-Packed  
  • Supports Energy and Skin Health  
  • Uses – Great for smoothies, soups, and baking
  
  Add a scoop of nature to your diet with our leafy vegetable powders.`,
  },
  {
    id: 13,
    image: '/images/slide13.jpg',
    title: 'Nuts',
    description: `Wholesome Crunch, Packed with Nutrition
  
  Our nuts are carefully selected to provide optimal health benefits and irresistible taste.
  
  INGREDIENTS
  • Almonds, Walnuts, Cashews, Pecans, and more
  
  BENEFITS
  • Heart-Healthy Fats  
  • Supports Brain Function and Weight Management  
  • Uses – Ideal for snacking, baking, and trail mixes
  
  Enjoy the goodness of nature’s finest snack – our premium nuts.`,
  },
  {
    id: 14,
    image: '/images/slide14.jpg',
    title: 'Natural Food Colours',
    description: `Vibrant, Safe, and Plant-Based
  
  Our natural food colors are made from herbal extracts and plants, offering a safe alternative to synthetic dyes.
  
  BENEFITS
  • Non-Toxic and Safe for All Ages  
  • Vibrant, Long-Lasting Colors  
  • Uses – Perfect for food, beverages, and cosmetics
  
  Add nature’s palette to your products with our food-safe colors.`,
  },
  {
    id: 15,
    image: '/images/slide15.jpg',
    title: 'Clay Products',
    description: `Crafted by Nature, Shaped by Hand
  
  Our eco-friendly clay products are handmade with love and sustainability in mind.
  
  PRODUCT RANGE
  • Clay Bowls, Pots, Glasses, Plates, Spoons, Diyas
  
  BENEFITS
  • Natural, Biodegradable, and Chemical-Free  
  • Crafted by Local Artisans  
  • Uses – Ideal for cooking, serving, decor, and gifting
  
  Bring home tradition and wellness with our handcrafted clayware.`,
  },
  {
    id: 16,
    image: '/images/slide16.jpg',
    title: 'LEAF PRODUCTS ',
    description: `
Nature's Gift, Sustainable and Eco-Friendly

Our Products
- Leaf Cups: Biodegradable and compostable
- Leaf Plates: Natural and non-toxic
- Leaf Bowls: Perfect for serving and enjoying your favorite dishes
- Leaf Containers: Eco-friendly packaging solutions

Benefits
- Sustainable and Eco-Friendly: Reduces plastic waste and promotes sustainability
- Biodegradable and Compostable: Leaves no toxic residue
- Natural and Non-Toxic: Safe for food and drink
- Unique and Handcrafted: Each piece is a work of art

Uses
- Parties and Events: Perfect for outdoor gatherings and celebrations
- Daily Use: Convenient and eco-friendly for everyday meals
- Food Packaging: Sustainable solution for food vendors and restaurants

Why Choose Us?
- High-Quality Products: Ensuring durability and performance
- Sustainable Practices: Supporting eco-friendly agriculture and community development
- Unique and Handcrafted: Each piece is a work of art and craftsmanship

Explore Our Leaf Products
Discover the benefits of our leaf products and experience the beauty of nature's gift, sustainable and eco-friendly.`,
  },
  {
    id: 17,
    image: '/images/slide17.jpg',
    title: 'PAPER BAGS',
    description: `Eco-Friendly and Sustainable Packaging Solutions

Our Products

- Paper Shopping Bags: Durable and versatile for retail use
- Paper Packaging Bags: Customizable solutions for businesses and individuals

Benefits
- Eco-Friendly and Sustainable: Reduces plastic waste and promotes sustainability
- Biodegradable and Compostable: Leaves no toxic residue
- Customizable: Perfect for businesses, events, and personal use
- Strong and Durable: Reliable for everyday use

Uses
- Retail and Shopping: Perfect for stores, boutiques, and online businesses
- Grocery Shopping: Convenient and eco-friendly for daily grocery shopping
- Gift Giving: Beautiful and sustainable for special occasions
- Food Packaging: Eco-friendly solution for food vendors and restaurants

Why Choose Us?
- High-Quality Products: Ensuring durability and performance
- Sustainable Practices: Supporting eco-friendly agriculture and community development
- Customizable Solutions: Perfect for businesses and individuals

Explore Our Paper Bags

Discover the benefits of our paper bags and experience the convenience of eco-friendly and sustainable packaging solutions.`,
  },
  {
    id: 18,
    image: '/images/slide18.jpg',
    title: 'BAMBOO PRODUCTS ',
    description: `Sustainable, Eco-Friendly, and  Innovative Solutions

Our Products

* Bamboo bottles: Reusable and sustainable alternatives to plastic 
* Bamboo Tumblers: Insulated and eco-friendly drinking vessels
- Bamboo Utensils: Spork, fork, knife, and spoon sets
- Bamboo Cutlery: Reusable and sustainable alternatives to plastic
- Bamboo Plates: Lightweight and durable dinnerware
- Bamboo Containers: Eco-friendly packaging solutions for food and other products 
- Bamboo Bowls: Natural and eco-friendly serving bowls
- Bamboo Cups: Sustainable and stylish drinking vessels

Benefits

- Sustainable and Eco-Friendly: Bamboo is a highly renewable resource
- Durable and Long-Lasting: Bamboo products are resistant to wear and tear
- Lightweight and Portable: Easy to carry and store
- Natural and Non-Toxic: Safe for food and drink

Uses

- Outdoor and Camping: Perfect for camping, picnics, and outdoor events
- Daily Use: Convenient and eco-friendly for everyday meals
- Food Service: Sustainable solution for restaurants, cafes, and food vendors
- Gift Ideas: Unique and thoughtful gifts for friends and family

Why Choose Us?

- High-Quality Products: Ensuring durability and performance
- Sustainable Practices: Supporting eco-friendly agriculture and community development
- Unique and Innovative: Constantly developing new and innovative bamboo products

Explore Our Bamboo Products

Discover the benefits of our bamboo products and experience the convenience of sustainable, eco-friendly, and durable solutions.`,
  },
  {
    id: 19,
    image: '/images/slide19.jpg',
    title: 'WOOD PRODUCTS',
    description: `Handcrafted with Love, Sustainable and Eco-Friendly

Our Products

- Wooden God Carvings: Intricately carved statues and figurines
- Wooden Bowls: Handcrafted and natural serving bowls
- Wooden Kitchenware: Sustainable and eco-friendly cooking utensils and tools
- Wooden Cups: Natural and stylish cups for hot and cold beverages
- Wooden Plates: Handcrafted and eco-friendly dinnerware
- Other Wood Products: Explore our variety of wooden products
Benefits

- Sustainable and Eco-Friendly: Wood is a natural and renewable resource
- Handcrafted with Love: Each piece is unique and crafted with care
- Durable and Long-Lasting: Wood products are resistant to wear and tear
- Natural and Non-Toxic: Safe for food and drink

Uses

- Home Decor: Add a touch of natural beauty to your home
- Kitchen and Dining: Perfect for cooking, serving, and enjoying meals
- Gift Ideas: Unique and thoughtful gifts for friends and family
- Outdoor and Camping: Sustainable and eco-friendly solutions for outdoor activities

Why Choose Us?

- High-Quality Products: Ensuring durability and performance
- Sustainable Practices: Supporting eco-friendly agriculture and community development
- Unique and Handcrafted: Each piece is a work of art and craftsmanship

Explore Our Wood Products

Discover the benefits of our wood products and experience the beauty of natural, sustainable, and eco-friendly solutions.`,
  }
  ,
  {
    id: 20,
    image: '/images/slide20.jpg',
    title: 'NATURAL INSECT CONTROL PRODUCTS ',
    description: `Eco-Friendly and Sustainable Solutions for Pest Management

Our Products

- Natural Insect Repellents: Plant-based powders
- Essential Oil-Based Insecticides: Effective and eco-friendly solutions
- Organic Pesticides: Natural and non-toxic alternatives to chemical pesticides

Benefits

- Eco-Friendly and Sustainable: Natural and non-toxic solutions for pest management
- Effective and Efficient: Proven results in controlling pests and insects
- Safe for People and Pets: No harsh chemicals or toxins
- Supports Biodiversity: Encourages beneficial insects and promotes ecosystem balance

Uses

- Gardening and Agriculture: Natural solutions for pest management in gardens and farms
- Outdoor and Recreational Areas: Effective and eco-friendly solutions for pest control in parks and outdoor spaces

Why Choose Us?

- High-Quality Products: Ensuring effectiveness and safety
- Sustainable Practices: Supporting eco-friendly agriculture and community development
- Expert Knowledge: Providing guidance and support for effective pest management

Explore Our Natural Insect Control Products

Discover the benefits of our natural insect control products and experience the effectiveness of eco-friendly and sustainable solutions for pest management.`,
  },
  
];

const Slideshow = () => {
  const formatDescription = (text) =>
    text.split('\n').map((line, index) => {
      const trimmed = line.trim();
      if (trimmed === '') return <br key={index} />;
      const isHeading = trimmed === trimmed.toUpperCase() || trimmed.endsWith(':');
      return (
        <p
          key={index}
          className={`mb-2 md:mb-3 transition-all duration-300 ${
            isHeading
              ? 'font-semibold text-gray-900 text-sm md:text-lg tracking-tight'
              : 'text-gray-800 text-xs md:text-base leading-relaxed'
          }`}
        >
          {trimmed}
        </p>
      );
    });

  return (
    <section className="w-full px-2 sm:px-4 md:px-8 py-8 bg-gradient-to-b from-gray-50 to-white">
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showThumbs={false}
        interval={7000}
        transitionTime={800}
        className="relative"
        showArrows={true}
        emulateTouch={true}
        renderArrowPrev={(onClickHandler, hasPrev) =>
          hasPrev && (
            <button
              onClick={onClickHandler}
              className="absolute left-1 sm:left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 p-2 sm:p-3 rounded-full shadow-lg hover:bg-white transition-all duration-300"
              aria-label="Previous slide"
            >
              <svg className="w-4 h-4 sm:w-6 sm:h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext) =>
          hasNext && (
            <button
              onClick={onClickHandler}
              className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 p-2 sm:p-3 rounded-full shadow-lg hover:bg-white transition-all duration-300"
              aria-label="Next slide"
            >
              <svg className="w-4 h-4 sm:w-6 sm:h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )
        }
      >
        {slideshowData.map((slide, index) => (
          <AnimatePresence key={slide.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className={`flex flex-col ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } items-center justify-between gap-4 sm:gap-6 md:gap-8 bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-xl overflow-hidden p-4 sm:p-6 md:p-8 max-w-7xl mx-auto`}
            >
              {/* Image */}
              <motion.div
                className="w-full md:w-1/2 h-48 sm:h-64 md:h-[32rem] relative overflow-hidden rounded-lg sm:rounded-xl shadow-md sm:shadow-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="object-cover w-full h-full transition-transform duration-700 hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </motion.div>

              {/* Text */}
              <div className="w-full md:w-1/2 flex flex-col justify-center p-4 sm:p-6">
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="text-xl sm:text-2xl md:text-3xl font-bold sm:font-extrabold text-gray-900 mb-3 sm:mb-5 tracking-tight"
                >
                  {slide.title}
                </motion.h2>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="text-gray-700 text-xs sm:text-sm md:text-base leading-relaxed max-h-[400px] overflow-y-auto pr-2"
                >
                  {formatDescription(slide.description)}
                </motion.div>
                <motion.a
                  href="#shop"
                  className="mt-4 sm:mt-6 inline-block bg-green-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-md sm:rounded-lg font-medium sm:font-semibold hover:bg-green-700 transition-colors duration-300 shadow-sm sm:shadow-md text-sm sm:text-base"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore Now
                </motion.a>
              </div>
            </motion.div>
          </AnimatePresence>
        ))}
      </Carousel>
    </section>
  );
};

export default Slideshow;

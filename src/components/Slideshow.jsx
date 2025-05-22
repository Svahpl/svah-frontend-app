import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { motion, AnimatePresence } from 'framer-motion';


// Slideshow Data
const slideshowData = [
  {
    id: 1,
    image: '/images/slide1.jpg',
    title: 'NATURAL COSMETIC PRODUCTS',
    description: `
Harnessing the potency of nature to nourish and rejuvenate your skin, hair, and overall well-being.

KEY INGREDIENTS
- Herbal Extracts
- Essential Oils
- Natural Moisturizers

BENEFITS OF NATURAL COSMETIC PRODUCTS
- Gentle and Non-Irritating: Less likely to cause skin irritation and allergic reactions
- Nourishing and Rejuvenating: Locks in moisture, promotes healthy skin and hair
- Environmentally Friendly: Biodegradable and sustainable, reducing environmental impact
- Effective and Potent: Centuries-old use in addressing various skin and hair concerns

EXPERIENCE THE POWER OF NATURE IN BEAUTY
Discover the benefits of natural cosmetic products and start your journey to healthier, more radiant skin and hair.`,
  },
  {
    id: 2,
    image: '/images/slide2.jpg',
    title: 'CELEBRATE HOLI WITH NATURE\'S VIBRANCE',
    description: `
Introducing our Natural Holi Colors, carefully crafted from flowers, seeds, and tubers. Our colors offer a safe, eco-friendly, and vibrant alternative to synthetic dyes.

WHY CHOOSE NATURAL HOLI COLORS ?
- Safe and Gentle: Made from natural ingredients, reducing the risk of skin irritation and allergic reactions.
- Eco-Friendly: Biodegradable and sustainable, minimizing environmental harm.
- Vibrant and Long-Lasting: Our natural colors provide a rich and festive experience.

JOIN THE MOVEMENT
Celebrate Holi with peace of mind, knowing you're choosing a more sustainable and skin-friendly option. Switch to our NATURAL Holi Colors and experience the joy of a vibrant and eco-friendly celebration.`,
  },
  {
    id: 3,
    image: '/images/slide3.jpg',
    title: 'NATURAL FARMING FOOD PRODUCTS',
    description: `
Nourishing Your Body

We're passionate about bringing you the best of nature's bounty. Our natural farming food products are carefully crafted to provide wholesome nutrition, while promoting sustainable agriculture and reducing environmental impact.

BENEFITS OF NATURAL FARMING 


- CHEMICAL -FREE : Our products are free from synthetic pesticides, herbicides, and fertilizers.
- NUTRIENT -RICH : Our natural farming practices preserve the natural nutrients and flavors of our crops.
- SUSTAINABLE : We believe in farming practices that promote soil health, biodiversity, and efficient water use.

JOIN THE MOVEMENT

Choose our natural farming food products and experience the difference for yourself. Taste the freshness, feel the goodness.`,
  },
  {
    id: 4,
    image: '/images/slide4.jpg',
    title: 'NATURAL FARMING MEDICINAL PLANT PRODUCTS',
    description: `
Harnessing Nature's Healing Power

OUR PRODUCT RANGE 
- Herbal Extracts: Concentrated plant extracts for various health benefits
- Botanical Powders: High-quality plant powders for pharmaceutical applications
- Herbal Oils: Natural oils extracted from medicinal plants for therapeutic use

KEY BENEFITS 
- Chemical-Free: Our products are free from synthetic pesticides, herbicides, and fertilizers
- Potent and Effective: Our natural farming practices preserve the natural potency and effectiveness of our medicinal plants
- Sustainable: We believe in farming practices that promote soil health, biodiversity, and efficient water use

OUR MISSION

We're dedicated to cultivating high-quality medicinal plant products using natural farming practices. Our products are carefully crafted to promote health and wellness, while respecting the environment and promoting sustainability.`,
  },
  {
    id: 5,
    image: '/images/slide5.jpg',
    title: 'HERBAL TEAS',
    description: `
BENEFITS OF HERBAL TEAS 
- NATURAL AND CAFFEINE - FREE : Perfect for those seeking a healthy alternative
- SMOOTHING AND CALMING: Reduces stress and anxiety
- PROMOTES BETTER SLEEP: Improves sleep quality
- SUPPORTS OVERALL HEALTH: Provides various health benefits, including:
    - Digestive aid
    - Immune system support
    - Weight loss
    - Improved digestion
    - Memory enhancement
    - Liver detox
    - Prevention of diabetes
    - Prevention of kidney disorders
    - Anti-stress
    - Anti-cancer properties
ENJOY THE BENEFITS
Explore our selection of herbal teas and discover the perfect blend for your needs. Savor the flavor and reap the rewards of nature's soothing remedies.`,
  },
  {
    id: 6,
    image: '/images/slide6.jpg',
    title: 'NUTRITIONAL FOOD PRODUCTS',
    description: `
A Delicious and Nutritious Snack
OUR BLEND
- HONEY : Rich in antioxidants and natural sweetness
- MIXED NUTS : Almonds, walnuts, pecans, and more, providing crunch and nutrition
- DRIED  FRUITS : Cranberries, raisins, apricot, and more, offering natural sweetness and chewiness
- SEEDS : Adding extra nutrition and crunch
NUTRITIONAL BENEFITS 
- ENERGY BOOST : A perfect snack to fuel your day
- RICH IN FIBRE : Supports healthy digestion and satiety
- ANTIOXIDANT - RICH : Protects against cell damage and oxidative stress
- SUPPORTS HEART HEALTH : May help lower cholesterol and blood pressure
ENJOY THE DELICIOUS TASTE AND NUTRITION
Try our Honey Mixed Nuts and Dried Fruits blend today and experience the perfect combination of taste and nutrition!`,
  },
  {
    id: 7,
    image: '/images/slide7.jpg',
    title: 'NATURAL FARMING MILLETS',
    description: `
OUR MILLET RICE 
- SUSTAINABLY GROWN: Free from chemicals and artificial fertilizers
- NUTRIENT - RICH: High in fiber, protein, and essential minerals
- DIVERSE VARIETIES: Offering a range of millets to suit your needs
BENEFITS OF NATURAL FARMING MILLETS 
- GLUTEN - FREE: Suitable for those with gluten intolerance or sensitivity
- HIGH IN ANTIOXIDANTS: Protects against cell damage and oxidative stress
- SUPPORTS HEALTHY DIGESTION : Rich in fiber and prebiotics
- MAY HELP LOWER CHOLESTEROL: Supports heart health and well-being
WHY CHOOSE OUR MILLETS? 
- NATURAL AND ORGANIC: Grown with care and respect for the environment
- HIGH - QUALITY GRAINS: Ensuring maximum nutritional benefit
- SUSTAINABLE FARMING PRACTICES : Supporting eco-friendly agriculture
EXPLORE OUR NATURAL FARMING MILLETS
Discover the benefits of natural farming millets and nourish your body with wholesome goodness. Perfect for health-conscious individuals and environmentally aware consumers.`,
  },
  {
    id: 8,
    image: '/images/slide8.jpg',
    title: 'MIXED MILLET POWDER',
    description: `
Nourishing Your Body with Wholesome Goodness
OUR BLEND 

- MULTI-GRAIN MIX: Combining the benefits of various millets
- NUTRIENT-RICH : High in fiber, protein, and essential minerals
- EASY TO DIGEST: Perfect for those with sensitive stomachs
BENEFITS OF MIXED MILLET POWDER FOOD 

- BOOSTS ENERGY: Provides sustained energy throughout the day
- SUPPORTS HEALTHY DIGESTION : Rich in fiber and prebiotics
- MAY HELP LOWER CHOLESTEROL: Supports heart health and well-being
- GLUTEN - FREE : Suitable for those with gluten intolerance or sensitivity
USES
- BREAKFAST PORRIDGE: Java and Ambali and Roti.
WHY CHOOSE OUR MIXED MILLET POWDER FOOD?
- NATURAL AND ORGANIC: Free from artificial additives and preservatives
- HIGH-QUALITY  INGREDIENTS : Ensuring maximum nutritional benefit
- SUSTAINABLE SOURCING: Supporting eco-friendly agriculture
EXPLORE OUR MIXED MILLET POWDER FOOD
Discover the benefits of our mixed millet powder food and nourish your body with wholesome goodness. Perfect for health-conscious individuals and environmentally aware consumers.`,
  },
  {
    id: 9,
    image: '/images/slide9.jpg',
    title: 'DRIED TUBER VEGETABLE FOOD',
    description: `
Nourishing Your Body with Wholesome Goodness
OUR PRODUCTS
- DRIED CARROT SLICES: Rich in vitamin A and fiber
- DRIED BEETROOT SLICES: High in antioxidants and nitrates
- DRIED RADISH SLICES: Packed with vitamin C and minerals
- DRIED TARO ROOT SLICES: Rich in fiber and essential minerals
- DRIED TAPIOCA SLICES: Gluten-free and easily digestible
- DRIED SWEET POTATO SLICES: Packed with vitamin A and minerals
BENEFITS OF DRIED TUBER VEGETABLES
- CONVENIENT AND SHELF-STABLE: Easy to store and transport
- NUTRIENT-RICH: Retains essential vitamins and minerals
- VERSATILE: Perfect for snacking, cooking, or adding to recipes
- SUPPORTS HEALTHY DIGESTION: High in fiber and antioxidants
USES 
- SNACKING : Enjoy as a healthy and crunchy snack
- COOKING : Add to soups, Curries, stews, or stir-fries for extra nutrition
- BAKING : Use in baked goods, such as cakes and muffins
WHY CHOOSE OUR DRIED TUBER VEGETABLES ? 
- NATURAL AND ORGANIC: Free from artificial additives and preservatives
- HIGH-QUALITY INGREDIENTS: Ensuring maximum nutritional benefit
- SUSTAINABLE SOURCING: Supporting eco-friendly agriculture
EXPLORE OUR DRIED TUBER VEGETABLE FOOD
Discover the benefits of our dried tuber vegetable food and nourish your body with wholesome goodness. Perfect for health-conscious individuals and environmentally aware consumers.`,
  },
  {
    id: 10,
    image: '/images/slide10.jpg',
    title: 'DRIED FRUIT SLICES',
    description: `
Nature's Candy, Preserved for Your Enjoyment
BENEFITS 
- CONVENIENT AND SHELF-STABLE: Easy to store and transport
- NUTRIENT-RICH: Retains essential vitamins and minerals
- VERSATILE: Perfect for snacking, baking, or adding to recipes
- SUPPORTS HEALTHY DIGESTION: High in fiber and antioxidants
USES 
- SNACKING : Enjoy as a healthy and convenient snack
- BAKING : Add to baked goods, such as cakes, muffins, and cookies
- COOKING : Use in savory dishes, such as stews and curries
- TRAIL MIX: Mix with nuts and seeds for a healthy and tasty snack
WHY CHOOSE US ?
- NATURAL AND ORGANIC: Free from artificial additives and preservatives
- HIGH - QUALITY INGREDIENTS: Ensuring maximum nutritional benefit
- SUSTAINABLE SOURCING: Supporting eco-friendly agriculture
EXPLORE OUR DRIED FRUITS FOOD
Discover the benefits of our dried fruits food and enjoy nature's candy, preserved for your enjoyment.`,
  },
  {
    id: 11,
    image: '/images/slide11.jpg',
    title: 'DRIED LEAFY VEGETABLES',
    description: `
Nourishing Your Body with Wholesome Goodness
OUR PRODUCTS 
- DRIED SPINACH: Rich in iron and antioxidants
- DRIED KALE: Packed with vitamins A, C, and K
- DRIED COLLARD GREENS : High in fiber and essential minerals
- DRIED AMARANTH: Rich in protein and antioxidants
- OTHER LEAFY GREENS: Explore our variety of dried leafy vegetables
Benefits
- CONVENIENT AND NUTRIENT-RICH: Easy to add to smoothies, soups, and recipes
- SUPPORTS HEALTHY DIGESTION: High in fiber and antioxidants
- MAY HELP BOOST ENERGY: Rich in essential vitamins and minerals
- SUPPORTS HEALTHY SKIN AND HAIR: Antioxidant-rich and nutrient-dense
USES 
- SMOOTHIES AND JUICES: Add to your favorite recipes for an extra nutritional boost
- SOUPS AND STEWS : Use as a natural flavor enhancer and thickening agent
- BAKING AND COOKING : Add to baked goods, sauces, and marinades for extra nutrition
WHY CHOOSE US?
- NATURAL AND ORGANIC: Free from artificial additives and preservatives
- HIGH - QUALITY INGREDIENTS: Ensuring maximum nutritional benefit
- SUSTAINABLE SOURCING: Supporting eco-friendly agriculture and practices
EXPLORE OUR DRIED LEAFY VEGETABLES
Discover the benefits of our dried leafy vegetables and nourish your body with wholesome goodness.`,
  },
  {
    id: 12,
    image: '/images/slide12.jpg',
    title: 'LEAFY VEGETABLE POWDERS',
    description: `
Nourishing Your Body with Wholesome Goodness
OUR PRODUCTS 
- SPINACH POWDER : Rich in iron and antioxidants
- KALE POWDER : Packed with vitamins A, C, and K
- COLLARD GREENS POWDER: High in fiber and essential minerals
- AMARANTH POWDER : Rich in protein and antioxidants
- SORREL LEAVES POWDER: Rich in vitamin A, C, K and calcium, iron, and potassium
- OTHER LEAFY GREENS: Explore our variety of leafy green powders
BENEFITS 
- CONVENIENT AND NUTRIENT-RICH: Easy to add to smoothies, soups, and recipes
- SUPPORTS HEALTHY DIGESTION: High in fiber and antioxidants
- MAY HELP BOOST ENERGY: Rich in essential vitamins and minerals
- SUPPORTS HEALTHY SKIN AND HAIR: Antioxidant-rich and nutrient-dense
USES
- SMOOTHIES AND JUICES: Add to your favorite recipes for an extra nutritional boost
- SOUPS AND STEWS : Use as a natural thickening agent and flavor enhancer
- BAKING AND COOKING : Add to baked goods, sauces, and marinades for extra nutrition
WHY CHOOSE US ?
- NATURAL AND ORGANIC : Free from artificial additives and preservatives
- HIGH - QUALITY INGREDIENTS : Ensuring maximum nutritional benefit
- SUSTAINABLE SOURCING: Supporting eco-friendly agriculture
EXPLORE OUR NATURAL FARMING LEAFY VEGETABLE POWDERS
Discover the benefits of our natural farming leafy vegetable powders and nourish your body with wholesome goodness.`,
  },
  {
    id: 13,
    image: '/images/slide13.jpg',
    title: 'NUTS',
    description: `
Nature's Perfect Snack, Packed with Nutrition
OUR PRODUCTS 
- ALMONDS: Rich in vitamin E and healthy fats
- WALNUTS: High in omega-3 fatty acids and antioxidants
- PECANS: Packed with antioxidants and essential minerals
- CASHEWS: Rich in magnesium and copper
- OTHER NUTS: Explore our variety of nuts
BENEFITS 
- SUPPORTS HEART HEALTH : Rich in healthy fats and antioxidants
- MAY HELP WITH WEIGHT : High in fiber and protein
- SUPPORTS BRAIN FUNCTION : Rich in omega-3 fatty acids and antioxidants
- MAY HELP LOWER CHOLESTEROL : Soluble fiber and healthy fats
USES
- SNACKING : Enjoy as a healthy and convenient snack
- BAKING AND COOKING : Add to baked goods, sauces, and marinades for extra nutrition
- TRAIL MIX : Mix with dried fruits and seeds for a healthy and tasty snack
WHY CHOOSE US ?
- HIGH - QUALITY INGREDIENTS : Ensuring maximum nutritional benefit
- SUSTAINABLE SOURCING : Supporting eco-friendly agriculture and practices
- NATURAL AND ORGANIC : Free from artificial additives and preservatives
EXPLORE OUR NUTS
Discover the benefits of our nuts and enjoy nature's perfect snack, packed with nutrition.`,
  },
  {
    id: 14,
    image: '/images/slide14.jpg',
    title: 'NATURAL FOOD COLOURS',
    description: `
Vibrant and Safe Colors for Your Food
OUR RANGE 
- PLANT BASED COLORS : Derived from fruits, vegetables, Flowers, seeds
- NATURAL DYES: Made from natural sources
- HERBAL EXTRACTS: Infused with herbs and botanicals for unique colors
BENEFITS OF NATURAL FOOD COLORS 
- SAFE AND NON-TOXIC : Free from artificial chemicals and additives
- VIBRANT AND CONSISTENT COLORS : Adds visual appeal to food products
- INCREASED CONSUMER APPEAL: Meets growing demand for natural and organic products
- UPPORTS SUSTAINABLE FOOD SYSTEMS : Aligns with eco-friendly and environmentally responsible practices
APPLICATIONS
- FOOD AND BEVERAGES : Perfect for coloring food products, such as candies, baked goods, and beverages
- COSMETICS AND PERSONAL CARE : Suitable for use in natural cosmetics and personal care products
WHY CHOOSE NATURAL FOOD COLORS?
- CLEAN LABEL : Supports clean label initiatives and transparency
- NATURAL AND SUSTAINABLE : Aligns with consumer demand for natural and eco-friendly products
- HIGH-QYALITY COLORS : Provides vibrant and consistent colors for food products
EXPLORE OUR NATURAL FOOD COLORS
Discover our range of natural food colors and add a pop of color to your food products. Perfect for food manufacturers, bakers, and crafters.`,
  },
  {
    id: 15,
    image: '/images/slide15.jpg',
    title: 'CLAY PRODUCTS',
    description: `
Handcrafted with Love, Nourishing Your Body and Soul
OUR PRODUCTS 
- CLAY BOWLS : Perfect for serving and enjoying your favorite dishes
- CLAY  POTS: Ideal for cooking and storing food
- CLAY  GLASSES : Unique and eco-friendly drinking vessels
- CLAY  PLATES: Handcrafted and perfect for serving meals
- CLAY  SPOONS: Natural and sustainable utensils
- CLAY  DIYAS : Beautiful and traditional Indian lamps
BENEFITS 
- NATURAL AND SUSTAINABLE : Free from artificial additives and chemicals
- ECO-FRIENDLY : Biodegradable and non-toxic
- HANDCRAFTED : Each piece is unique and made with love
- SUPPORTS LOCAL ARTISANS : Promoting traditional craftsmanship and community development
USES
- HOME DECOR : Add a touch of natural beauty to your home
- COOKING AND SERVING : Use our clay pots and bowls for healthy and flavorful meals
- SPECIAL OCCASIONS  : Perfect for festivals, ceremonies, and special events
- GIFT IDEAS : Unique and thoughtful gifts for friends and family
WHY CHOOSE US ?
- HIGH - QUALITY PRODUCT : Ensuring durability and longevity
- SUSTAINABLE PRACTICES : Supporting eco-friendly agriculture and community development
- UNIQUE AND HANDCRAFTED : Each piece is a work of art and craftsmanship
EXPLORE OUR CLAY PRODUCTS

Discover the beauty and benefits of our clay products and nourish your body and soul with wholesome goodness.`,
  },
  {
    id: 16,
    image: '/images/slide16.jpg',
    title: 'LEAF PRODUCTS',
    description: `
Nature's Gift, Sustainable and Eco-Friendly
OUR PRODUCTS 
- LEAF CUPS: Biodegradable and compostable
- LEAF PLATES: Natural and non-toxic
- LEAF BOWLS: Perfect for serving and enjoying your favorite dishes
- LEAF CONTAINERS: Eco-friendly packaging solutions
BENEFITS 
- SUSTAINABLE AND ECO - FRIENDLY: Reduces plastic waste and promotes sustainability
- BIODEGRADABLE AND COMPOSTABLE : Leaves no toxic residue
- NATURAL AND NON-TOXIC : Safe for food and drink
- UNIQUE AND HANDCRAFTED : Each piece is a work of art
USES 
- PARTIES AND EVENTS: Perfect for outdoor gatherings and celebrations
- DAILY USE: Convenient and eco-friendly for everyday meals
- FOOD PACKAGING: Sustainable solution for food vendors and restaurants
WHY CHOOSE US ?
- HIGH - QUALITY PRODUCTS : Ensuring durability and performance
- SUSTAINABLE PRACTICES : Supporting eco-friendly agriculture and community development
- UNIQUE AND HANDCRAFTED: Each piece is a work of art and craftsmanship
EXPLORE OUR LEAF PRODUCTS
Discover the benefits of our leaf products and experience the beauty of nature's gift, sustainable and eco-friendly.`,
  },
  {
    id: 17,
    image: '/images/slide17.jpg',
    title: 'PAPER BAGS',
    description: `
Eco-Friendly and Sustainable Packaging Solutions
OUR PRODUCTS 
- PAPER SHOPPING BAGS: Durable and versatile for retail use
- PAPER PACKAGING BAGS: Customizable solutions for businesses and individuals
BENEFITS 
- ECO-FRIENDLY AND SUSTAINABLE : Reduces plastic waste and promotes sustainability
- BIODEGRADABLE AND COMPOSTABLE : Leaves no toxic residue
- CUSTOMISABLE : Perfect for businesses, events, and personal use
- STRONG AND DURABLE : Reliable for everyday use
USES
- RETAIL AND SHOPPING : Perfect for stores, boutiques, and online businesses
- GROCERY SHOPPING  : Convenient and eco-friendly for daily grocery shopping
- GIFT GIVING : Beautiful and sustainable for special occasions
- FOOD PACKAGING : Eco-friendly solution for food vendors and restaurants
WHY CHOOSE US ?
- HIGH - QUALITY PRODUCTS : Ensuring durability and performance
- SUSTAINABLE PRACTICES : Supporting eco-friendly agriculture and community development
- CUSTOMIZABLE SOLUTIONS : Perfect for businesses and individuals
EXPLORE OUR PAPER BAGS
Discover the benefits of our paper bags and experience the convenience of eco-friendly and sustainable packaging solutions.`,
  },
  {
    id: 18,
    image: '/images/slide18.jpg',
    title: 'BAMBOO PRODUCTS',
    description: `
Sustainable, Eco-Friendly, and Innovative Solutions
OUR PRODUCTS 
* BAMBOO  BOTTLES : Reusable and sustainable alternatives to plastic 
* BAMBOO  TUMBLERS : Insulated and eco-friendly drinking vessels
- BAMBOO  UTENSILS : Spork, fork, knife, and spoon sets
- BAMBOO  CUTLERY : Reusable and sustainable alternatives to plastic
- BAMBOO  PLATES : Lightweight and durable dinnerware
- BAMBOO  CONTAINERS: Eco-friendly packaging solutions for food and other products 
- BAMBOO  BOWLS: Natural and eco-friendly serving bowls
- BAMBOO  CUPS: Sustainable and stylish drinking vessels
BENEFITS 
- SUSTAINABLE AND ECO-FRIENDLY : Bamboo is a highly renewable resource
- DURABLE AND LONG - LASTING : Bamboo products are resistant to wear and tear
- LIGHTWEIGHT AND PORTABLE : Easy to carry and store
- NATURAL AND NON- TOXIC : Safe for food and drink
USES
- OUTDOOR AND CAMPING : Perfect for camping, picnics, and outdoor events
- DAILY USE : Convenient and eco-friendly for everyday meals
- FOOD SERVICE : Sustainable solution for restaurants, cafes, and food vendors
- GIFT IDEAS : Unique and thoughtful gifts for friends and family
WHY CHOOSE US ? 
- HIGH - QUALITY PRODUCTS: Ensuring durability and performance
- SUSTAINABLE PRACTICES: Supporting eco-friendly agriculture and community development
- UNIQUE AND INNOVATIVE: Constantly developing new and innovative bamboo products
EXPLORE OUR BAMBOO PRODUCTS
Discover the benefits of our bamboo products and experience the convenience of sustainable, eco-friendly, and durable solutions.`,
  },
  {
    id: 19,
    image: '/images/slide19.jpg',
    title: 'WOOD PRODUCTS',
    description: `
Handcrafted with Love, Sustainable and Eco-Friendly
OUR PRODUCTS 
- WOODEN GOD CARVINGS : Intricately carved statues and figurines
- WOODEN BOWLS : Handcrafted and natural serving bowls
- WOODEN KITCHENWARE : Sustainable and eco-friendly cooking utensils and tools
- WOODEN CUPS : Natural and stylish cups for hot and cold beverages
- WOODEN PLATES : Handcrafted and eco-friendly dinnerware
- OTHER WOOD PRODUCTS: Explore our variety of wooden products
BENEFITS 
- SUSTAINABLE AND ECO-FRIENDLY : Wood is a natural and renewable resource
- HANDCRAFTED WITH LOVE : Each piece is unique and crafted with care
- DURABLE AND LONG - LASTING : Wood products are resistant to wear and tear
- NATURAL AND NON-TOXIC : Safe for food and drink
USES
- HOME DECOR : Add a touch of natural beauty to your home
- KITCHEN AND DINING : Perfect for cooking, serving, and enjoying meals
- GIFT IDEAS : Unique and thoughtful gifts for friends and family
- OUTDOOR AND CAMPING : Sustainable and eco-friendly solutions for outdoor activities
WHY CHOOSE US ? 
- HIGH - QUALITY PRODUCTS : Ensuring durability and performance
- SUSTAINABLE PRACTICES : Supporting eco-friendly agriculture and community development
- UNIQUE AND HANDCRAFTED : Each piece is a work of art and craftsmanship
EXPLORE OUR WOOD PRODUCTS
Discover the benefits of our wood products and experience the beauty of natural, sustainable, and eco-friendly solutions.`,
  },
  {
    id: 20,
    image: '/images/slide20.jpg',
    title: 'NATURAL INSECT CONTROL PRODUCTS',
    description: `
Eco-Friendly and Sustainable Solutions for Pest Management
OUR PRODUCTS 
- NATURAL INSECT REPELLENTS: Plant-based powders
- ESSENTIAL OIL- BASED INSECTICIDES: Effective and eco-friendly solutions
- ORGANIC PESTICIDES: Natural and non-toxic alternatives to chemical pesticides
BENEFITS 
- ECO- FRIENDLY AND SUSTAINABLE : Natural and non-toxic solutions for pest management
- EFFECTIVE AND EFFICIENT : Proven results in controlling pests and insects
- SAFE FOR PEOPLE AND PETS : No harsh chemicals or toxins
- SUPPORTS BIODIVERSITY : Encourages beneficial insects and promotes ecosystem balance
USES
- GARDENING AND AGRICULTURE : Natural solutions for pest management in gardens and farms
- OUTDOOR AND RECREATIONAL AREAS : Effective and eco-friendly solutions for pest control in parks and outdoor spaces

WHY CHOOSE US ?
- HIGH - QUALITY PRODUCTS : Ensuring effectiveness and safety
- SUSTAINABLE PRACTICES : Supporting eco-friendly agriculture and community development
- EXPERT KNOWLEDGE : Providing guidance and support for effective pest management
EXPLORE OUR NATURAL INSECT CONTROL PRODUCTS 
Discover the benefits of our natural insect control products and experience the effectiveness of eco-friendly and sustainable solutions for pest management`,
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
          className={`mb-2 transition-all duration-300 ${
            isHeading
              ? 'font-semibold text-gray-900 text-xs sm:text-sm md:text-lg tracking-tight'
              : 'text-gray-800 text-xs sm:text-sm md:text-base leading-relaxed'
          }`}
        >
          {trimmed}
        </p>
      );
    });

  return (
    <section className="w-full px-2 sm:px-4 md:px-8 py-8 bg-gradient-to-b from-gray-50 to-white overflow-visible">
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showThumbs={false}
        interval={7000}
        transitionTime={800}
        showArrows={true}
        emulateTouch={true}
        swipeable={true}
        preventMovementUntilSwipeScrollTolerance={true}
        swipeScrollTolerance={50}
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              className="absolute z-20 left-2 top-1/2 transform -translate-y-1/2 bg-white text-gray-800 p-2 rounded-full shadow-md hover:bg-gray-100 transition"
            >
              ‹
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              className="absolute z-20 right-2 top-1/2 transform -translate-y-1/2 bg-white text-gray-800 p-2 rounded-full shadow-md hover:bg-gray-100 transition"
            >
              ›
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
              } items-center justify-between gap-4 sm:gap-6 md:gap-8 bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-xl p-4 sm:p-6 md:p-8 max-w-7xl mx-auto`}
            >
              {/* Image */}
              <motion.div
                className="w-full md:w-1/2 relative overflow-hidden rounded-lg sm:rounded-xl shadow-md sm:shadow-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="object-contain w-full h-auto max-h-[20rem] sm:max-h-[24rem] md:max-h-[32rem] transition-transform duration-700 hover:scale-110"
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
                  className="text-lg sm:text-xl md:text-3xl font-bold sm:font-extrabold text-gray-900 mb-3 sm:mb-5 tracking-tight"
                >
                  {slide.title}
                </motion.h2>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="text-gray-700 text-xs sm:text-sm md:text-base leading-relaxed max-h-[200px] sm:max-h-[300px] md:max-h-[400px] overflow-y-auto pr-2"
                >
                  {formatDescription(slide.description)}
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        ))}
      </Carousel>
    </section>
  );
};

export default Slideshow;

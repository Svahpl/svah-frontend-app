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
* Herbal Extracts
- Essential Oils
- Natural Moisturizers

Benefits of Natural Cosmetic Products
- Gentle and Non-Irritating: Less likely to cause skin irritation and allergic reactions
- Nourishing and Rejuvenating: Locks in moisture, promotes healthy skin and hair
- Environmentally Friendly: Biodegradable and sustainable, reducing environmental impact
- Effective and Potent: Centuries-old use in addressing various skin and hair concerns

Experience the Power of Nature in Beauty
Discover the benefits of natural cosmetic products and start your journey to healthier, more radiant skin and hair.`,
  },
  {
    id: 2,
    image: '/images/slide2.jpg',
    title: 'CELEBRATE HOLI WITH NATURE\'S VIBRANCE',
    description: `
Introducing our Natural Holi Colors, carefully crafted from flowers, seeds, and tubers. Our colors offer a safe, eco-friendly, and vibrant alternative to synthetic dyes.

Why Choose Natural Holi Colors?
- Safe and Gentle: Made from natural ingredients, reducing the risk of skin irritation and allergic reactions.
- Eco-Friendly: Biodegradable and sustainable, minimizing environmental harm.
- Vibrant and Long-Lasting: Our natural colors provide a rich and festive experience.

Join the Movement
Celebrate Holi with peace of mind, knowing you're choosing a more sustainable and skin-friendly option. Switch to our NATURAL Holi Colors and experience the joy of a vibrant and eco-friendly celebration.`,
  },
  {
    id: 3,
    image: '/images/slide3.jpg',
    title: 'NATURAL FARMING FOOD PRODUCTS',
    description: `
Nourishing Your Body

We're passionate about bringing you the best of nature's bounty. Our natural farming food products are carefully crafted to provide wholesome nutrition, while promoting sustainable agriculture and reducing environmental impact.

Benefits of Natural Farming

- Chemical-Free: Our products are free from synthetic pesticides, herbicides, and fertilizers.
- Nutrient-Rich: Our natural farming practices preserve the natural nutrients and flavors of our crops.
- Sustainable: We believe in farming practices that promote soil health, biodiversity, and efficient water use.

Join the Movement

Choose our natural farming food products and experience the difference for yourself. Taste the freshness, feel the goodness.`,
  },
  {
    id: 4,
    image: '/images/slide4.jpg',
    title: 'NATURAL FARMING MEDICINAL PLANT PRODUCTS',
    description: `
Harnessing Nature's Healing Power

Our Product Range
- Herbal Extracts: Concentrated plant extracts for various health benefits
- Botanical Powders: High-quality plant powders for pharmaceutical applications
- Herbal Oils: Natural oils extracted from medicinal plants for therapeutic use

Key Benefits
- Chemical-Free: Our products are free from synthetic pesticides, herbicides, and fertilizers
- Potent and Effective: Our natural farming practices preserve the natural potency and effectiveness of our medicinal plants
- Sustainable: We believe in farming practices that promote soil health, biodiversity, and efficient water use

Our Mission

We're dedicated to cultivating high-quality medicinal plant products using natural farming practices. Our products are carefully crafted to promote health and wellness, while respecting the environment and promoting sustainability.`,
  },
  {
    id: 5,
    image: '/images/slide5.jpg',
    title: 'HERBAL TEAS',
    description: `
Benefits of Herbal Teas
- Natural and Caffeine-Free: Perfect for those seeking a healthy alternative
- Soothing and Calming: Reduces stress and anxiety
- Promotes Better Sleep: Improves sleep quality
- Supports Overall Health: Provides various health benefits, including:
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
Enjoy the Benefits
Explore our selection of herbal teas and discover the perfect blend for your needs. Savor the flavor and reap the rewards of nature's soothing remedies.`,
  },
  {
    id: 6,
    image: '/images/slide6.jpg',
    title: 'NUTRITIONAL FOOD PRODUCTS',
    description: `
A Delicious and Nutritious Snack
Our Blend
- Honey: Rich in antioxidants and natural sweetness
- Mixed Nuts: Almonds, walnuts, pecans, and more, providing crunch and nutrition
- Dried Fruits: Cranberries, raisins, apricot, and more, offering natural sweetness and chewiness
- Seeds: Adding extra nutrition and crunch
Nutritional Benefits
- Energy Boost: A perfect snack to fuel your day
- Rich in Fiber: Supports healthy digestion and satiety
- Antioxidant-Rich: Protects against cell damage and oxidative stress
- Supports Heart Health: May help lower cholesterol and blood pressure
Enjoy the Delicious Taste and Nutrition
Try our Honey Mixed Nuts and Dried Fruits blend today and experience the perfect combination of taste and nutrition!`,
  },
  {
    id: 7,
    image: '/images/slide7.jpg',
    title: 'NATURAL FARMING MILLETS',
    description: `
Our Millet Rice
- Sustainably Grown: Free from chemicals and artificial fertilizers
- Nutrient-Rich: High in fiber, protein, and essential minerals
- Diverse Varieties: Offering a range of millets to suit your needs
Benefits of Natural Farming Millets
- Gluten-Free: Suitable for those with gluten intolerance or sensitivity
- High in Antioxidants: Protects against cell damage and oxidative stress
- Supports Healthy Digestion: Rich in fiber and prebiotics
- May Help Lower Cholesterol: Supports heart health and well-being
Why Choose Our Millets?
- Natural and Organic: Grown with care and respect for the environment
- High-Quality Grains: Ensuring maximum nutritional benefit
- Sustainable Farming Practices: Supporting eco-friendly agriculture
Explore Our Natural Farming Millets
Discover the benefits of natural farming millets and nourish your body with wholesome goodness. Perfect for health-conscious individuals and environmentally aware consumers.`,
  },
  {
    id: 8,
    image: '/images/slide8.jpg',
    title: 'MIXED MILLET POWDER',
    description: `
Nourishing Your Body with Wholesome Goodness
Our Blend
- Multi-Grain Mix: Combining the benefits of various millets
- Nutrient-Rich: High in fiber, protein, and essential minerals
- Easy to Digest: Perfect for those with sensitive stomachs
Benefits of Mixed Millet Powder Food
- Boosts Energy: Provides sustained energy throughout the day
- Supports Healthy Digestion: Rich in fiber and prebiotics
- May Help Lower Cholesterol: Supports heart health and well-being
- Gluten-Free: Suitable for those with gluten intolerance or sensitivity
Uses
- Breakfast Porridge: Java and Ambali and Roti.
Why Choose Our Mixed Millet Powder Food?
- Natural and Organic: Free from artificial additives and preservatives
- High-Quality Ingredients: Ensuring maximum nutritional benefit
- Sustainable Sourcing: Supporting eco-friendly agriculture
Explore Our Mixed Millet Powder Food
Discover the benefits of our mixed millet powder food and nourish your body with wholesome goodness. Perfect for health-conscious individuals and environmentally aware consumers.`,
  },
  {
    id: 9,
    image: '/images/slide9.jpg',
    title: 'DRIED TUBER VEGETABLE FOOD',
    description: `
Nourishing Your Body with Wholesome Goodness
Our Products
- Dried Carrot Slices: Rich in vitamin A and fiber
- Dried Beetroot Slices: High in antioxidants and nitrates
- Dried Radish Slices: Packed with vitamin C and minerals
- Dried Taro Root Slices: Rich in fiber and essential minerals
- Dried Tapioca Slices: Gluten-free and easily digestible
- Dried Sweet Potato Slices: Packed with vitamin A and minerals
Benefits of Dried Tuber Vegetables
- Convenient and Shelf-Stable: Easy to store and transport
- Nutrient-Rich: Retains essential vitamins and minerals
- Versatile: Perfect for snacking, cooking, or adding to recipes
- Supports Healthy Digestion: High in fiber and antioxidants
Uses
- Snacking: Enjoy as a healthy and crunchy snack
- Cooking: Add to soups, Curries, stews, or stir-fries for extra nutrition
- Baking: Use in baked goods, such as cakes and muffins
Why Choose Our Dried Tuber Vegetables?
- Natural and Organic: Free from artificial additives and preservatives
- High-Quality Ingredients: Ensuring maximum nutritional benefit
- Sustainable Sourcing: Supporting eco-friendly agriculture
Explore Our Dried Tuber Vegetable Food
Discover the benefits of our dried tuber vegetable food and nourish your body with wholesome goodness. Perfect for health-conscious individuals and environmentally aware consumers.`,
  },
  {
    id: 10,
    image: '/images/slide10.jpg',
    title: 'DRIED FRUIT SLICES',
    description: `
Nature's Candy, Preserved for Your Enjoyment
Benefits
- Convenient and Shelf-Stable: Easy to store and transport
- Nutrient-Rich: Retains essential vitamins and minerals
- Versatile: Perfect for snacking, baking, or adding to recipes
- Supports Healthy Digestion: High in fiber and antioxidants
Uses
- Snacking: Enjoy as a healthy and convenient snack
- Baking: Add to baked goods, such as cakes, muffins, and cookies
- Cooking: Use in savory dishes, such as stews and curries
- Trail Mix: Mix with nuts and seeds for a healthy and tasty snack
Why Choose Us?
- Natural and Organic: Free from artificial additives and preservatives
- High-Quality Ingredients: Ensuring maximum nutritional benefit
- Sustainable Sourcing: Supporting eco-friendly agriculture
Explore Our Dried Fruits Food
Discover the benefits of our dried fruits food and enjoy nature's candy, preserved for your enjoyment.`,
  },
  {
    id: 11,
    image: '/images/slide11.jpg',
    title: 'DRIED LEAFY VEGETABLES',
    description: `
Nourishing Your Body with Wholesome Goodness
Our Products
- Dried Spinach: Rich in iron and antioxidants
- Dried Kale: Packed with vitamins A, C, and K
- Dried Collard Greens: High in fiber and essential minerals
- Dried Amaranth: Rich in protein and antioxidants
- Other Leafy Greens: Explore our variety of dried leafy vegetables
Benefits
- Convenient and Nutrient-Rich: Easy to add to smoothies, soups, and recipes
- Supports Healthy Digestion: High in fiber and antioxidants
- May Help Boost Energy: Rich in essential vitamins and minerals
- Supports Healthy Skin and Hair: Antioxidant-rich and nutrient-dense
Uses
- Smoothies and Juices: Add to your favorite recipes for an extra nutritional boost
- Soups and Stews: Use as a natural flavor enhancer and thickening agent
- Baking and Cooking: Add to baked goods, sauces, and marinades for extra nutrition
Why Choose Us?
- Natural and Organic: Free from artificial additives and preservatives
- High-Quality Ingredients: Ensuring maximum nutritional benefit
- Sustainable Sourcing: Supporting eco-friendly agriculture and practices
Explore Our Dried Leafy Vegetables
Discover the benefits of our dried leafy vegetables and nourish your body with wholesome goodness.`,
  },
  {
    id: 12,
    image: '/images/slide12.jpg',
    title: 'LEAFY VEGETABLE POWDERS',
    description: `
Nourishing Your Body with Wholesome Goodness
Our Products
- Spinach Powder: Rich in iron and antioxidants
- Kale Powder: Packed with vitamins A, C, and K
- Collard Greens Powder: High in fiber and essential minerals
- Amaranth Powder: Rich in protein and antioxidants
- Sorrel Powder: Rich in vitamin A, C, K and calcium, iron, and potassium
- Other Leafy Greens: Explore our variety of leafy green powders
Benefits
- Convenient and Nutrient-Rich: Easy to add to smoothies, soups, and recipes
- Supports Healthy Digestion: High in fiber and antioxidants
- May Help Boost Energy: Rich in essential vitamins and minerals
- Supports Healthy Skin and Hair: Antioxidant-rich and nutrient-dense
Uses
- Smoothies and Juices: Add to your favorite recipes for an extra nutritional boost
- Soups and Stews: Use as a natural thickening agent and flavor enhancer
- Baking and Cooking: Add to baked goods, sauces, and marinades for extra nutrition
Why Choose Us?
- Natural and Organic: Free from artificial additives and preservatives
- High-Quality Ingredients: Ensuring maximum nutritional benefit
- Sustainable Sourcing: Supporting eco-friendly agriculture
Explore Our Natural Farming Leafy Vegetable Powders
Discover the benefits of our natural farming leafy vegetable powders and nourish your body with wholesome goodness.`,
  },
  {
    id: 13,
    image: '/images/slide13.jpg',
    title: 'NUTS',
    description: `
Nature's Perfect Snack, Packed with Nutrition
Our Products
- Almonds: Rich in vitamin E and healthy fats
- Walnuts: High in omega-3 fatty acids and antioxidants
- Pecans: Packed with antioxidants and essential minerals
- Cashews: Rich in magnesium and copper
- Other Nuts: Explore our variety of nuts
Benefits
- Supports Heart Health: Rich in healthy fats and antioxidants
- May Help with Weight Management: High in fiber and protein
- Supports Brain Function: Rich in omega-3 fatty acids and antioxidants
- May Help Lower Cholesterol: Soluble fiber and healthy fats
Uses
- Snacking: Enjoy as a healthy and convenient snack
- Baking and Cooking: Add to baked goods, sauces, and marinades for extra nutrition
- Trail Mix: Mix with dried fruits and seeds for a healthy and tasty snack
Why Choose Us?
- High-Quality Ingredients: Ensuring maximum nutritional benefit
- Sustainable Sourcing: Supporting eco-friendly agriculture and practices
- Natural and Organic: Free from artificial additives and preservatives
Explore Our Nuts
Discover the benefits of our nuts and enjoy nature's perfect snack, packed with nutrition.`,
  },
  {
    id: 14,
    image: '/images/slide14.jpg',
    title: 'NATURAL FOOD COLOURS',
    description: `
Vibrant and Safe Colors for Your Food
Our Range
 Plant-Based Colors: Derived from fruits, vegetables, Flowers, seeds
- Natural Dyes: Made from natural sources
- Herbal Extracts: Infused with herbs and botanicals for unique colors
Benefits of Natural Food Colors
- Safe and Non-Toxic: Free from artificial chemicals and additives
- Vibrant and Consistent Colors: Adds visual appeal to food products
- Increased Consumer Appeal: Meets growing demand for natural and organic products
- Supports Sustainable Food Systems: Aligns with eco-friendly and environmentally responsible practices
Applications
- Food and Beverages: Perfect for coloring food products, such as candies, baked goods, and beverages
- Cosmetics and Personal Care: Suitable for use in natural cosmetics and personal care products
Why Choose Natural Food Colors?
- Clean Label: Supports clean label initiatives and transparency
- Natural and Sustainable: Aligns with consumer demand for natural and eco-friendly products
- High-Quality Colors: Provides vibrant and consistent colors for food products
Explore Our Natural Food Colors
Discover our range of natural food colors and add a pop of color to your food products. Perfect for food manufacturers, bakers, and crafters.`,
  },
  {
    id: 15,
    image: '/images/slide15.jpg',
    title: 'CLAY PRODUCTS',
    description: `
Handcrafted with Love, Nourishing Your Body and Soul
Our Products
- Clay Bowls: Perfect for serving and enjoying your favorite dishes
- Clay Pots: Ideal for cooking and storing food
- Clay Glasses: Unique and eco-friendly drinking vessels
- Clay Plates: Handcrafted and perfect for serving meals
- Clay Spoons: Natural and sustainable utensils
- Clay Diyas: Beautiful and traditional Indian lamps
Benefits
- Natural and Sustainable: Free from artificial additives and chemicals
- Eco-Friendly: Biodegradable and non-toxic
- Handcrafted: Each piece is unique and made with love
- Supports Local Artisans: Promoting traditional craftsmanship and community development
Uses
- Home Decor: Add a touch of natural beauty to your home
- Cooking and Serving: Use our clay pots and bowls for healthy and flavorful meals
- Special Occasions: Perfect for festivals, ceremonies, and special events
- Gift Ideas: Unique and thoughtful gifts for friends and family
Why Choose Us?
- High-Quality Products: Ensuring durability and longevity
- Sustainable Practices: Supporting eco-friendly agriculture and community development
- Unique and Handcrafted: Each piece is a work of art and craftsmanship
Explore Our Clay Products

Discover the beauty and benefits of our clay products and nourish your body and soul with wholesome goodness.`,
  },
  {
    id: 16,
    image: '/images/slide16.jpg',
    title: 'LEAF PRODUCTS',
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
Discover the benefits of our leaf products and experience the beauty of nature's gift, sustainable and eco-friendly.`,
  },
  {
    id: 17,
    image: '/images/slide17.jpg',
    title: 'PAPER BAGS',
    description: `
Eco-Friendly and Sustainable Packaging Solutions
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
Discover the benefits of our paper bags and experience the convenience of eco-friendly and sustainable packaging solutions.`,
  },
  {
    id: 18,
    image: '/images/slide18.jpg',
    title: 'BAMBOO PRODUCTS',
    description: `
Sustainable, Eco-Friendly, and Innovative Solutions
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
Discover the benefits of our bamboo products and experience the convenience of sustainable, eco-friendly, and durable solutions.`,
  },
  {
    id: 19,
    image: '/images/slide19.jpg',
    title: 'WOOD PRODUCTS',
    description: `
Handcrafted with Love, Sustainable and Eco-Friendly
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
Discover the benefits of our wood products and experience the beauty of natural, sustainable, and eco-friendly solutions.`,
  },
  {
    id: 20,
    image: '/images/slide20.jpg',
    title: 'NATURAL INSECT CONTROL PRODUCTS',
    description: `
Eco-Friendly and Sustainable Solutions for Pest Management
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

/**
 * Placeholder data for the Smart Rental site
 * Provides sample data for items, categories, and users
 */

// Placeholder rental items data
const rentalItems = [
    {
        id: 1,
        title: "Canon EOS 5D Mark IV DSLR Camera",
        description: "Professional DSLR camera with 30.4MP full-frame CMOS sensor and DIGIC 6+ image processor. Perfect for photography enthusiasts.",
        price: 150,
        priceUnit: "DH / DAY",
        seller: "Mohammed Alaoui",
        image: "https://images.unsplash.com/photo-1516724562728-afc824a36e84?w=500"
    },
    {
        id: 2,
        title: "DJI Mavic Air 2 Drone with Controller",
        description: "Compact drone with 4K camera, 34-minute flight time, and intelligent shooting modes for aerial photography and videography.",
        price: 200,
        priceUnit: "DH / DAY",
        seller: "Fatima Zahra",
        image: "https://images.unsplash.com/photo-1508444845599-5c89863b1c44?w=500"
    },
    {
        id: 3,
        title: "Bosch Professional Power Drill Set",
        description: "High-performance cordless drill with lithium-ion battery, variable speed settings, and complete accessory kit for DIY projects.",
        price: 85,
        priceUnit: "DH / DAY",
        seller: "Hassan Benjelloun",
        image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=500"
    },
    {
        id: 4,
        title: "Yamaha P-125 Digital Piano with Stand",
        description: "88-key weighted digital piano with authentic sound quality, built-in speakers, and various connectivity options for recording.",
        price: 120,
        priceUnit: "DH / DAY",
        seller: "Laila Bennani",
        image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=500"
    },
    {
        id: 5,
        title: "Sony PlayStation 5 Console with Extra Controller",
        description: "Next-gen gaming console with 825GB SSD, 4K HDR graphics, and ultra-high-speed SSD for immersive gaming experience.",
        price: 180,
        priceUnit: "DH / DAY",
        seller: "Karim Idrissi",
        image: "https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=500"
    },
    {
        id: 6,
        title: "Mountain Bike - Specialized Rockhopper",
        description: "Premium mountain bike with aluminum frame, hydraulic disc brakes, and 29-inch wheels for off-road adventures.",
        price: 90,
        priceUnit: "DH / DAY",
        seller: "Youssef Tahiri",
        image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=500"
    },
    {
        id: 7,
        title: "Camping Tent - Coleman 4-Person",
        description: "Spacious weather-resistant tent with quick setup system, waterproof floor, and excellent ventilation for outdoor camping.",
        price: 65,
        priceUnit: "DH / DAY",
        seller: "Amina Chaoui",
        image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=500"
    },
    {
        id: 8,
        title: "Microsoft Surface Pro 8 with Keyboard",
        description: "Versatile 2-in-1 tablet with 13-inch touchscreen, Intel Core i5, 8GB RAM, and 256GB SSD for productivity on the go.",
        price: 175,
        priceUnit: "DH / DAY",
        seller: "Omar Bakkali",
        image: "https://images.unsplash.com/photo-1543069190-4dd08cb871ee?w=500"
    }
];

// Popular categories with icons
const categories = [
    { id: 1, name: "Electronics", icon: "fas fa-laptop", active: true },
    { id: 2, name: "Cameras", icon: "fas fa-camera", active: false },
    { id: 3, name: "Tools", icon: "fas fa-tools", active: false },
    { id: 4, name: "Sports", icon: "fas fa-futbol", active: false },
    { id: 5, name: "Music", icon: "fas fa-music", active: false }
    // { id: 6, name: "Gaming", icon: "fas fa-gamepad", active: false },
    // { id: 7, name: "Camping", icon: "fas fa-campground", active: false },
    // { id: 8, name: "Furniture", icon: "fas fa-couch", active: false },
    // { id: 9, name: "Books", icon: "fas fa-book", active: false }
];

// User testimonials
const testimonials = [
    {
        id: 1,
        name: "SARA MONTASIR",
        rating: 4.5,
        text: "Smart Rental has transformed how I access equipment for my photography business. The platform is user-friendly and I've found high-quality gear at reasonable prices."
    },
    {
        id: 2,
        name: "YOUSSEF KHALID",
        rating: 5,
        text: "The service is exceptional! I've been able to try out different tools before buying, saving me thousands. The process is seamless from booking to return."
    },
    {
        id: 3,
        name: "AMINE BERRADA",
        rating: 4,
        text: "As a DIY enthusiast, Smart Rental has been a game-changer. I can access professional tools for weekend projects without the commitment of purchasing expensive equipment."
    }
];

// Expose the data globally
window.SMART_RENTAL_DATA = {
    items: rentalItems,
    categories: categories,
    testimonials: testimonials
}; 
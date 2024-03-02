const sampleListings = [
    {
        title: "Statue of Liberty",
        description: "The Statue of Liberty is a colossal neoclassical sculpture on Liberty Island in New York Harbor in New York City, in the United States.",
        image: "https://images.unsplash.com/photo-1577999913008-8460500e6264?q=80&w=1949&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price: 25,
        location: "City",
        country: "USA"
    },
    {
        title: "Taj Mahal",
        description: "The Taj Mahal is an ivory-white marble mausoleum on the right bank of the river Yamuna in the Indian city of Agra.",
        image: "https://plus.unsplash.com/premium_photo-1661885523029-fc960a2bb4f3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price: 1000,
        location: "City",
        country: "India"
    },
    {
        title: "Santorini",
        description: "Santorini is one of the Cyclades islands in the Aegean Sea. It was devastated by a volcanic eruption in the 16th century BC, forever shaping its rugged landscape.",
        image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price: 50,
        location: "Island",
        country: "Greece"
    },
    {
        title: "Victoria Falls",
        description: "Victoria Falls is a waterfall on the Zambezi River in southern Africa, which provides habitat for several unique species of plants and animals.",
        image: "https://images.unsplash.com/photo-1619029383069-21d494034ed7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price: 80,
        location: "Natural Wonder",
        country: "Zimbabwe"
    },
    {
        title: "Machu Picchu",
        description: "Machu Picchu is a 15th-century Inca citadel located in the Eastern Cordillera of southern Peru.",
        image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price: 100,
        location: "Mountain",
        country: "Peru"
    },
    {
        title: "Petra",
        description: "Petra is a famous archaeological site in Jordan's southwestern desert.",
        image: "https://images.unsplash.com/photo-1580834341580-8c17a3a630ca?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price: 40,
        location: "Historical Site",
        country: "Jordan"
    },
    {
        title: "Great Barrier Reef",
        description: "The Great Barrier Reef is the world's largest coral reef system composed of over 2,900 individual reefs and 900 islands.",
        image: "https://images.unsplash.com/photo-1587139223877-04cb899fa3e8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price: 120,
        location: "Sea",
        country: "Australia"
    },
    {
        title: "Matterhorn",
        description: "The Matterhorn is a mountain of the Alps, straddling the main watershed and border between Switzerland and Italy.",
        image: "https://images.unsplash.com/photo-1545161296-d9c2c241f2ad?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price: 60,
        location: "Mountain",
        country: "Switzerland"
    },
    {
        title: "Angkor Wat",
        description: "Angkor Wat is a temple complex in Cambodia and the largest religious monument in the world.",
        image: "https://images.unsplash.com/photo-1701632773403-46b149020f24?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price: 40,
        location: "Historical Site",
        country: "Cambodia"
    },
    {
        title: "Northern Lights",
        description: "The Northern Lights, or Aurora Borealis, are a natural light display in the Earth's sky, predominantly seen in high-latitude regions around the Arctic and Antarctic.",
        image: "https://plus.unsplash.com/premium_photo-1675756583711-ce312872227b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price: 0,
        location: "Natural Phenomenon",
        country: "Norway"
    }
];

module.exports = { data: sampleListings };

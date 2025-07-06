import { Product } from "@/contexts/CartContext";

export const products: Product[] = [
  {
    id: 1,
    name: "Rainbow Dreams Dress",
    price: "$45",
    originalPrice: "$60",
    image: "👗",
    emoji: "🌈",
    description: "Twirly dress with rainbow pockets",
    rating: 5,
    category: "girls",
    isNew: true,
    realImage: "https://image.pollinations.ai/prompt/cute%20rainbow%20dress%20for%20little%20girls%20colorful%20twirly%20dress%20with%20pockets?width=600&height=600&model=flux&enhance=true",
    additionalImages: [
      "https://image.pollinations.ai/prompt/rainbow%20dress%20for%20kids%20front%20view%20colorful%20pockets?width=600&height=600&model=flux&enhance=true",
      "https://image.pollinations.ai/prompt/rainbow%20dress%20for%20children%20back%20view%20twirly%20design?width=600&height=600&model=flux&enhance=true",
      "https://image.pollinations.ai/prompt/rainbow%20dress%20detail%20view%20colorful%20fabric%20texture?width=600&height=600&model=flux&enhance=true"
    ]
  },
  {
    id: 2,
    name: "Adventure Shorts",
    price: "$28",
    image: "🩳",
    emoji: "🏃",
    description: "Perfect for playground adventures",
    rating: 5,
    category: "boys",
    realImage: "https://image.pollinations.ai/prompt/adventure%20shorts%20for%20boys%20playground%20wear%20comfortable%20kids%20clothing?width=600&height=600&model=flux&enhance=true",
    additionalImages: [
      "https://image.pollinations.ai/prompt/boys%20adventure%20shorts%20side%20view%20pockets%20design?width=600&height=600&model=flux&enhance=true",
      "https://image.pollinations.ai/prompt/playground%20shorts%20for%20children%20active%20wear%20detail?width=600&height=600&model=flux&enhance=true",
      "https://image.pollinations.ai/prompt/adventure%20shorts%20fabric%20close%20up%20durable%20material?width=600&height=600&model=flux&enhance=true"
    ]
  },
  {
    id: 3,
    name: "Cozy Cloud Sweater",
    price: "$52",
    image: "🧥",
    emoji: "☁️",
    description: "Soft as clouds, warm as hugs",
    rating: 4,
    category: "unisex",
    isPopular: true,
    realImage: "https://image.pollinations.ai/prompt/cozy%20cloud%20sweater%20for%20kids%20soft%20fluffy%20white%20comfortable?width=600&height=600&model=flux&enhance=true",
    additionalImages: [
      "https://image.pollinations.ai/prompt/cloud%20sweater%20children%20front%20view%20soft%20knit%20texture?width=600&height=600&model=flux&enhance=true",
      "https://image.pollinations.ai/prompt/cozy%20kids%20sweater%20back%20view%20cloud%20pattern%20design?width=600&height=600&model=flux&enhance=true",
      "https://image.pollinations.ai/prompt/fluffy%20sweater%20detail%20soft%20fabric%20texture%20close%20up?width=600&height=600&model=flux&enhance=true"
    ]
  },
  {
    id: 4,
    name: "Superhero Cape Tee",
    price: "$32",
    image: "👕",
    emoji: "🦸",
    description: "Every kid needs a cape!",
    rating: 5,
    category: "boys",
    realImage: "https://image.pollinations.ai/prompt/superhero%20cape%20t-shirt%20for%20boys%20red%20cape%20attached%20kids%20costume?width=600&height=600&model=flux&enhance=true",
    additionalImages: [
      "https://image.pollinations.ai/prompt/superhero%20tee%20with%20cape%20front%20view%20boys%20clothing?width=600&height=600&model=flux&enhance=true",
      "https://image.pollinations.ai/prompt/cape%20t-shirt%20back%20view%20superhero%20design%20for%20kids?width=600&height=600&model=flux&enhance=true",
      "https://image.pollinations.ai/prompt/superhero%20cape%20detail%20red%20fabric%20flowing%20design?width=600&height=600&model=flux&enhance=true"
    ]
  },
  {
    id: 5,
    name: "Butterfly Wings Tutu",
    price: "$38",
    originalPrice: "$45",
    image: "🩰",
    emoji: "🦋",
    description: "Dance like a butterfly",
    rating: 5,
    category: "girls",
    isNew: true,
    realImage: "https://image.pollinations.ai/prompt/butterfly%20wings%20tutu%20dress%20for%20girls%20colorful%20dance%20costume?width=600&height=600&model=flux&enhance=true",
    additionalImages: [
      "https://image.pollinations.ai/prompt/butterfly%20tutu%20front%20view%20colorful%20wings%20attached?width=600&height=600&model=flux&enhance=true",
      "https://image.pollinations.ai/prompt/butterfly%20wings%20tutu%20back%20view%20dance%20costume%20girls?width=600&height=600&model=flux&enhance=true",
      "https://image.pollinations.ai/prompt/butterfly%20wings%20detail%20colorful%20tulle%20fabric%20texture?width=600&height=600&model=flux&enhance=true"
    ]
  },
  {
    id: 6,
    name: "Space Explorer Pants",
    price: "$35",
    image: "👖",
    emoji: "🚀",
    description: "Ready for space adventures",
    rating: 4,
    category: "boys",
    realImage: "https://image.pollinations.ai/prompt/space%20explorer%20pants%20for%20boys%20astronaut%20design%20kids%20clothing?width=600&height=600&model=flux&enhance=true",
    additionalImages: [
      "https://image.pollinations.ai/prompt/space%20pants%20boys%20front%20view%20astronaut%20patches%20design?width=600&height=600&model=flux&enhance=true",
      "https://image.pollinations.ai/prompt/explorer%20pants%20back%20view%20space%20theme%20kids%20wear?width=600&height=600&model=flux&enhance=true",
      "https://image.pollinations.ai/prompt/space%20pants%20detail%20astronaut%20patches%20rocket%20design?width=600&height=600&model=flux&enhance=true"
    ]
  },
  {
    id: 7,
    name: "Flower Power Cardigan",
    price: "$48",
    image: "🧚",
    emoji: "🌸",
    description: "Blooming with personality",
    rating: 5,
    category: "girls",
    isPopular: true,
    realImage: "https://image.pollinations.ai/prompt/flower%20power%20cardigan%20for%20girls%20floral%20pattern%20pink%20cute%20design?width=600&height=600&model=flux&enhance=true",
    additionalImages: [
      "https://image.pollinations.ai/prompt/floral%20cardigan%20girls%20front%20view%20flower%20embroidery%20design?width=600&height=600&model=flux&enhance=true",
      "https://image.pollinations.ai/prompt/flower%20cardigan%20back%20view%20blooming%20pattern%20girls%20clothing?width=600&height=600&model=flux&enhance=true",
      "https://image.pollinations.ai/prompt/flower%20power%20cardigan%20detail%20floral%20embroidery%20texture?width=600&height=600&model=flux&enhance=true"
    ]
  },
  {
    id: 8,
    name: "Dinosaur Roar Hoodie",
    price: "$42",
    image: "🦖",
    emoji: "🦕",
    description: "ROAR-some comfort",
    rating: 5,
    category: "boys",
    realImage: "https://image.pollinations.ai/prompt/dinosaur%20hoodie%20for%20boys%20T-rex%20design%20green%20comfortable%20kids%20wear?width=600&height=600&model=flux&enhance=true",
    additionalImages: [
      "https://image.pollinations.ai/prompt/dinosaur%20hoodie%20front%20view%20T-rex%20print%20boys%20clothing?width=600&height=600&model=flux&enhance=true",
      "https://image.pollinations.ai/prompt/roar%20hoodie%20back%20view%20dinosaur%20design%20kids%20wear?width=600&height=600&model=flux&enhance=true",
      "https://image.pollinations.ai/prompt/dinosaur%20hoodie%20detail%20T-rex%20embroidery%20pocket%20design?width=600&height=600&model=flux&enhance=true"
    ]
  },
  {
    id: 9,
    name: "Princess Castle Dress",
    price: "$55",
    image: "👸",
    emoji: "🏰",
    description: "Every day is a fairy tale",
    rating: 5,
    category: "girls",
    isNew: true,
    realImage: "https://image.pollinations.ai/prompt/princess%20castle%20dress%20for%20girls%20pink%20fairy%20tale%20elegant%20design?width=600&height=600&model=flux&enhance=true",
    additionalImages: [
      "https://image.pollinations.ai/prompt/princess%20dress%20front%20view%20castle%20embroidery%20pink%20elegant?width=600&height=600&model=flux&enhance=true",
      "https://image.pollinations.ai/prompt/castle%20dress%20back%20view%20princess%20design%20fairy%20tale%20style?width=600&height=600&model=flux&enhance=true",
      "https://image.pollinations.ai/prompt/princess%20dress%20detail%20castle%20pattern%20sparkly%20fabric%20texture?width=600&height=600&model=flux&enhance=true"
    ]
  },
  {
    id: 10,
    name: "Ninja Warrior Set",
    price: "$48",
    image: "🥷",
    emoji: "⚔️",
    description: "Stealth mode activated",
    rating: 4,
    category: "boys",
    isPopular: true,
    realImage: "https://image.pollinations.ai/prompt/ninja%20warrior%20set%20for%20boys%20black%20martial%20arts%20costume%20kids%20outfit?width=600&height=600&model=flux&enhance=true",
    additionalImages: [
      "https://image.pollinations.ai/prompt/ninja%20costume%20front%20view%20warrior%20design%20boys%20martial%20arts?width=600&height=600&model=flux&enhance=true",
      "https://image.pollinations.ai/prompt/ninja%20set%20back%20view%20stealth%20mode%20black%20outfit%20kids?width=600&height=600&model=flux&enhance=true",
      "https://image.pollinations.ai/prompt/ninja%20warrior%20detail%20martial%20arts%20accessories%20belt%20design?width=600&height=600&model=flux&enhance=true"
    ]
  }
];
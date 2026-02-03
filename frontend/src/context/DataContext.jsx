import { createContext, useContext, useState } from "react";

export const DataContext = createContext(null);

const mockProducts = [
  {
    id: 1,
    title: "Wireless Headphones",
    description: "High quality wireless headphones with noise cancellation.",
    price: 199,
    category: "Electronics",
    brand: "SoundMagic",
    image: "https://images.unsplash.com/photo-1691649485759-2ca657415fde?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Headphones
  },
  {
    id: 2,
    title: "Smart Watch",
    description: "Track your fitness and notifications on the go.",
    price: 149,
    category: "Wearables",
    brand: "FitTech",
    image: "https://images.unsplash.com/photo-1617043983671-adaadcaa2460?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Smart Watch
  },
  {
    id: 3,
    title: "Bluetooth Speaker",
    description: "Portable speaker with deep bass and long battery life.",
    price: 89,
    category: "Electronics",
    brand: "BoomBox",
    image: "https://images.unsplash.com/photo-1507878566509-a0dbe19677a5?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Bluetooth Speaker
  },
  {
    id: 4,
    title: "Gaming Mouse",
    description: "Ergonomic mouse with customizable buttons.",
    price: 59,
    category: "Accessories",
    brand: "GamePro",
    image: "https://images.unsplash.com/photo-1629121291243-7b5e885cce9b?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Gaming Mouse
  },
  {
    id: 5,
    title: "4K LED TV",
    description: "Ultra HD Smart TV with vibrant colors and streaming apps.",
    price: 799,
    category: "Electronics",
    brand: "ViewPlus",
    image: "https://plus.unsplash.com/premium_photo-1683141392308-aaa39d916686?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // TV
  },
  {
    id: 6,
    title: "Fitness Tracker",
    description: "Monitor your health and activity 24/7.",
    price: 99,
    category: "Wearables",
    brand: "FitTech",
    image: "https://images.unsplash.com/photo-1557935728-e6d1eaabe558?q=80&w=873&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Fitness Tracker
  },
  {
    id: 7,
    title: "Laptop Backpack",
    description: "Water-resistant backpack with laptop compartment.",
    price: 49,
    category: "Accessories",
    brand: "UrbanGear",
    image: "https://images.unsplash.com/photo-1667411424594-672f7a3df708?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Backpack
  },
  {
    id: 8,
    title: "Wireless Charger",
    description: "Fast wireless charging pad for smartphones.",
    price: 29,
    category: "Accessories",
    brand: "ChargeIt",
    image: "https://images.unsplash.com/photo-1615526675159-e248c3021d3f?q=80&w=386&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Wireless Charger
  },
  {
    id: 9,
    title: "Noise Cancelling Earbuds",
    description: "Compact earbuds with active noise cancellation.",
    price: 129,
    category: "Electronics",
    brand: "SoundMagic",
    image: "https://images.unsplash.com/photo-1733641839241-6ae7a628971f?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Earbuds
  },
  {
    id: 10,
    title: "Mechanical Keyboard",
    description: "RGB backlit mechanical keyboard for gaming.",
    price: 109,
    category: "Accessories",
    brand: "GamePro",
    image: "https://images.unsplash.com/photo-1625130694338-4110ba634e59?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Keyboard
  },
  {
    id: 11,
    title: "Smartphone Gimbal",
    description: "Stabilize your videos with this 3-axis gimbal.",
    price: 159,
    category: "Electronics",
    brand: "SteadyShot",
    image: "https://images.unsplash.com/photo-1638243292863-3744d6a7e021?q=80&w=443&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Gimbal
  },
  {
    id: 12,
    title: "Portable SSD",
    description: "High-speed portable SSD for data storage.",
    price: 179,
    category: "Electronics",
    brand: "DataSafe",
    image: "https://media.istockphoto.com/id/1410783528/photo/ssd-m2-disk-close-up-on-dark-background.jpg?s=1024x1024&w=is&k=20&c=inzqH5BPCZfuuf5x7vYzclxDu6OsvtpyHAMWL9J-Bi4=" // SSD
  }
];

export const DataProvider = ({ children }) => {
    const [data, setData] = useState(mockProducts);

    const getUniqueCategory = (data, property) =>{
        let newVal = data?.map((curElem) =>{
            return curElem[property]
        })
        newVal = ["All",...new Set(newVal)]
        return newVal
      }
    
      const categoryOnlyData = getUniqueCategory(data, "category")
      const brandOnlyData = getUniqueCategory(data, "brand")
    return <DataContext.Provider value={{ data, setData, categoryOnlyData, brandOnlyData }}>
        {children}
    </DataContext.Provider>
}

export const getData = ()=> useContext(DataContext)

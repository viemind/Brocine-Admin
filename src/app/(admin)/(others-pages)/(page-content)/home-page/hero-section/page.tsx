"use client"
import HeroSectionCard from "@/components/common/HeroSectionCard";
import ResponsiveView from "@/components/common/ResponsiveView";
import HeroSection from "@/types/hero.type";
import { useHomeStore } from "@/stores/home.store";
import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { database } from "../../../../../../../firebase";
import { FIREBASE_BROSCINE, FIREBASE_HERO, FIREBASE_HOME } from "@/constants/firebase";

export default function HomePageHeroSection() {
  const { content, setContent, setHomeStore, fUpdateHeroSection } = useHomeStore();

  const fetchData = async () => {
    const heroSectionRef = doc(database, FIREBASE_BROSCINE, FIREBASE_HOME);
    const docSnap = await getDoc(heroSectionRef);
    if (docSnap.exists()) { 
      const data = docSnap.data()[FIREBASE_HERO] as HeroSection;
      setHomeStore('content', data);
    };
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  return (
    <div>
      <div className="rounded-2xl borderF border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Home Page - Hero Section
        </h3>

        <div className="space-y-6">
          <HeroSectionCard 
            key="home-page-hero-card"
            store={{
              content: content,
              setContent: setContent,
              setStore: setHomeStore,
              updateContent: fUpdateHeroSection,
            }}

          />
          <ResponsiveView 
            key="home-page-hero-view" 
            title={content.title}
            subtitle={content.subtitle}
            imageUrl={content.imageUrl}
          />
        </div>
      </div>
    </div>
  );
}
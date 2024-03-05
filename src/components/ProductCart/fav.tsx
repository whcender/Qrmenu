"use client"
import React from "react";
import { FaHeart } from "react-icons/fa";
import { useState, useEffect } from "react";

const Fav = ({ id }: any) => {
    const [isFav, setIsFav] = useState(false);
    const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

    useEffect(() => {
        // Get favorite IDs from localStorage
        const storedFavoriteIds = JSON.parse(localStorage.getItem("favoriteIds") || "[]");
        setFavoriteIds(storedFavoriteIds);
        setIsFav(storedFavoriteIds.includes(id));
    }, [id]);

    const toggleFavorite = () => {
        let updatedFavoriteIds: string[];
        if (isFav) {
            // Remove from favorites if already favorited
            updatedFavoriteIds = favoriteIds.filter((favId: string) => favId !== id);
        } else {
            // Add to favorites if not already favorited
            updatedFavoriteIds = [...favoriteIds, id];
        }

        // Update localStorage
        localStorage.setItem("favoriteIds", JSON.stringify(updatedFavoriteIds));
        setFavoriteIds(updatedFavoriteIds);
        setIsFav(!isFav);
    };

    return (
        <button
            onClick={toggleFavorite}
            className={`border p-2 rounded-xl absolute top-3 left-2  ${isFav ? " text-red-600" : ""}`}
        >
            <FaHeart size={20} />
        </button>
    );
};

export default Fav;

"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import supabase from "@/config/supabaseClient";
import "../../app/BackgroundAnimation.css";
import { Check } from "lucide-react"; // Icon Library
import { Card, CardContent } from "@/components/ui/card"; // Shadcn UI Components
import { useRouter } from "next/navigation";

function lobbyPage() {
  const router = useRouter();
  const [gameName, setGameName] = useState("");
  const [betDescription, setBetDescription] = useState("");
  const [line, setLine] = useState("");
  const [deadline, setDeadline] = useState("");
  const [gameid, setGameid] = useState("");
  const [userBet, setUserBet] = useState("");
  const [message, setMessage] = useState("");
  const currentDate = new Date();
  const customDateFormatter = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  const formattedDate = deadline
    ? customDateFormatter.format(new Date(deadline))
    : "";

  useEffect(() => {
    const fetchGameDetails = async () => {
      const query = new URLSearchParams(window.location.search);
      const gameidParam = query.get("gameid");

      if (gameidParam) {
        setGameid(gameidParam);
        const { data, error } = await supabase
          .from("games")
          .select("*")
          .eq("gameid", gameidParam)
          .single();

        if (error) {
          console.error("Error fetching game details:", error);
          setMessage("Error fetching game details.");
        } else {
          setGameName(data.game_name);
          setBetDescription(data.bet_description);
          setLine(data.line);
          setDeadline(data.deadline);
        }
      }
    };

    fetchGameDetails();
  }, []);

  return (
    <div className="min-h-screen w-screen bg-gray-200 flex-auto">
      <header className="mx-auto max-w-full h-20 items-center justify-between p-4 lg:px-8 flex bg-blue-200">
        <nav className="flex-row">
          <Link href={"/home"}>
            <h1 className="text-4xl font-Modak">Over Under</h1>
          </Link>
        </nav>
        <nav className="flex-row-reverse space-x-4 place-items-center">
          <button className="hover:scale-105">
            <Link
              href="https://github.com/EliteMicah/SWE-Over-Under"
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="49px"
                height="49px"
                viewBox="-5 -6 64 64"
              >
                <path d="M 32 10 C 19.85 10 10 19.85 10 32 C 10 44.15 19.85 54 32 54 C 44.15 54 54 44.15 54 32 C 54 19.85 44.15 10 32 10 z M 32 14 C 41.941 14 50 22.059 50 32 C 50 40.238706 44.458716 47.16934 36.904297 49.306641 C 36.811496 49.1154 36.747844 48.905917 36.753906 48.667969 C 36.784906 47.458969 36.753906 44.637563 36.753906 43.601562 C 36.753906 41.823563 35.628906 40.5625 35.628906 40.5625 C 35.628906 40.5625 44.453125 40.662094 44.453125 31.246094 C 44.453125 27.613094 42.554688 25.720703 42.554688 25.720703 C 42.554688 25.720703 43.551984 21.842266 42.208984 20.197266 C 40.703984 20.034266 38.008422 21.634812 36.857422 22.382812 C 36.857422 22.382813 35.034 21.634766 32 21.634766 C 28.966 21.634766 27.142578 22.382812 27.142578 22.382812 C 25.991578 21.634813 23.296016 20.035266 21.791016 20.197266 C 20.449016 21.842266 21.445312 25.720703 21.445312 25.720703 C 21.445312 25.720703 19.546875 27.611141 19.546875 31.244141 C 19.546875 40.660141 28.371094 40.5625 28.371094 40.5625 C 28.371094 40.5625 27.366329 41.706312 27.265625 43.345703 C 26.675939 43.553637 25.872132 43.798828 25.105469 43.798828 C 23.255469 43.798828 21.849984 42.001922 21.333984 41.169922 C 20.825984 40.348922 19.7845 39.660156 18.8125 39.660156 C 18.1725 39.660156 17.859375 39.981656 17.859375 40.347656 C 17.859375 40.713656 18.757609 40.968484 19.349609 41.646484 C 20.597609 43.076484 20.574484 46.292969 25.021484 46.292969 C 25.547281 46.292969 26.492043 46.171872 27.246094 46.068359 C 27.241926 47.077908 27.230199 48.046135 27.246094 48.666016 C 27.251958 48.904708 27.187126 49.114952 27.09375 49.306641 C 19.540258 47.168741 14 40.238046 14 32 C 14 22.059 22.059 14 32 14 z"></path>
              </svg>
            </Link>
          </button>
          <button className="hover:scale-105">
            <Link href="/info">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="40px"
                viewBox="0 -960 960 960"
                width="40px"
                fill="#000000"
              >
                <path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
              </svg>
            </Link>
          </button>
          <button className="hover:scale-105">
            <Link href="/profile">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="40px"
                viewBox="0 -960 960 960"
                width="40px"
                fill="#000000"
              >
                <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" />
              </svg>
            </Link>
          </button>
        </nav>
      </header>
      <div className="flex mt-4 mx-8 justify-between">
        <div className="flex flex-row items-center">
          <h2 className="text-black-400 font-bold p-2 text-xl">Deadline:</h2>
          <h2 className="text-black-400 font-bold p-1 text-xl rounded-[6px] bg-red-400">
            &nbsp;{formattedDate}&nbsp;
          </h2>
        </div>
        <h2 className="text-black-400 font-bold p-2 text-xl">#{gameid}</h2>
      </div>
      <div className="relative pt-[50px] w-lvw h-lvh items-center flex flex-col">
        <div className="flex gap-8 justify-center items-center pb-16">
          <h1 className="font-Modak text-7xl drop-shadow-lg">
            Bet Group Name Here
          </h1>
        </div>
        <div>
          <h2 className="font-bold text-3xl drop-shadow-lg">
            Bet description here
          </h2>
        </div>

        <Card className="mt-8 p-4 flex flex-col items-center w-40 border-0 shadow-none">
          {/* Circular Badge with Checkmark */}
          <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center">
            <Check className="text-black w-8 h-8" />
          </div>
          {/* Crown and Username */}
          <div className="relative mt-2 text-center">
            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
              👑 {/* Crown Emoji (Replace with an icon if needed) */}
            </div>
            <p className="font-bold text-black">UsernameHere</p>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default lobbyPage;
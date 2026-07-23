export const FACTS: string[] = [
  "Octopuses have three hearts and blue blood.",
  "Honey never spoils — edible pots have been found in 3,000-year-old tombs.",
  "Bananas are berries, but strawberries are not.",
  "A group of flamingos is called a 'flamboyance'.",
  "The Eiffel Tower can grow more than 6 inches taller in summer heat.",
  "Wombat poop is cube-shaped.",
  "Sharks existed before trees did.",
  "There are more possible chess games than atoms in the observable universe.",
  "A day on Venus is longer than a year on Venus.",
  "Cows have best friends and get stressed when separated.",
  "The unicorn is Scotland's national animal.",
  "Bubble wrap was originally invented as textured wallpaper.",
  "Sea otters hold hands while sleeping so they don't drift apart.",
  "Your stomach gets a new lining every 3–4 days.",
  "The dot over a lowercase 'i' or 'j' is called a tittle.",
  "Slugs have four noses.",
  "Ketchup was sold as medicine in the 1830s.",
  "A cloud can weigh over a million pounds.",
  "There's a species of jellyfish that is biologically immortal.",
  "Bees can recognize human faces.",
  "The inventor of the Pringles can is buried in one.",
  "Rats laugh when tickled — at ultrasonic frequencies.",
  "The shortest war in history lasted 38 minutes.",
  "You can't hum while holding your nose.",
  "Pineapples take about two years to grow.",
];

export function randomFact(exclude?: string): string {
  let pick = FACTS[Math.floor(Math.random() * FACTS.length)];
  if (exclude && FACTS.length > 1) {
    while (pick === exclude) pick = FACTS[Math.floor(Math.random() * FACTS.length)];
  }
  return pick;
}

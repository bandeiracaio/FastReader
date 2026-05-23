import type { SampleCategory } from "../types";

export const QUICK_DEMO_SENTENCE =
  "Focus on each word, keep a steady rhythm, and let your eyes stay relaxed as the words appear in sequence.";

export const QUICK_DEMO_TEXT = Array.from(
  { length: 50 },
  () => QUICK_DEMO_SENTENCE
).join(" ");

export const LONG_SAMPLE_CATEGORIES: SampleCategory[] = [
  {
    id: "english-classics",
    label: "English Classics",
    description: "Victorian, gothic, and adventure staples.",
    samples: [
      { id: "pride-and-prejudice", label: "Pride and Prejudice", description: "Jane Austen", url: "samples/pride-and-prejudice.txt" },
      { id: "moby-dick", label: "Moby-Dick", description: "Herman Melville", url: "samples/moby-dick.txt" },
      { id: "dracula", label: "Dracula", description: "Bram Stoker", url: "samples/dracula.txt" },
      { id: "frankenstein", label: "Frankenstein", description: "Mary Shelley", url: "samples/frankenstein.txt" },
      { id: "alice-wonderland", label: "Alice's Adventures in Wonderland", description: "Lewis Carroll", url: "samples/alice-wonderland.txt" },
      { id: "sherlock-holmes", label: "The Adventures of Sherlock Holmes", description: "Arthur Conan Doyle", url: "samples/sherlock-holmes.txt" },
      { id: "tale-of-two-cities", label: "A Tale of Two Cities", description: "Charles Dickens", url: "samples/tale-of-two-cities.txt" },
      { id: "dorian-gray", label: "The Picture of Dorian Gray", description: "Oscar Wilde", url: "samples/dorian-gray.txt" },
      { id: "time-machine", label: "The Time Machine", description: "H. G. Wells", url: "samples/time-machine.txt" },
      { id: "war-of-worlds", label: "The War of the Worlds", description: "H. G. Wells", url: "samples/war-of-worlds.txt" },
      { id: "great-expectations", label: "Great Expectations", description: "Charles Dickens", url: "samples/great-expectations.txt" },
      { id: "little-women", label: "Little Women", description: "Louisa May Alcott", url: "samples/little-women.txt" },
      { id: "jane-eyre", label: "Jane Eyre", description: "Charlotte Brontë", url: "samples/jane-eyre.txt" },
      { id: "treasure-island", label: "Treasure Island", description: "Robert Louis Stevenson", url: "samples/treasure-island.txt" },
      { id: "call-of-the-wild", label: "The Call of the Wild", description: "Jack London", url: "samples/call-of-the-wild.txt" },
      { id: "scarlet-letter", label: "The Scarlet Letter", description: "Nathaniel Hawthorne", url: "samples/scarlet-letter.txt" }
    ]
  },
  {
    id: "russian-classics",
    label: "Russian Classics",
    description: "Epic novels and realist masterpieces.",
    samples: [
      { id: "war-and-peace", label: "War and Peace", description: "Leo Tolstoy", url: "samples/war-and-peace.txt" },
      { id: "anna-karenina", label: "Anna Karenina", description: "Leo Tolstoy", url: "samples/anna-karenina.txt" },
      { id: "crime-and-punishment", label: "Crime and Punishment", description: "Fyodor Dostoevsky", url: "samples/crime-and-punishment.txt" },
      { id: "brothers-karamazov", label: "The Brothers Karamazov", description: "Fyodor Dostoevsky", url: "samples/brothers-karamazov.txt" },
      { id: "dead-souls", label: "Dead Souls", description: "Nikolai Gogol", url: "samples/dead-souls.txt" },
      { id: "fathers-and-sons", label: "Fathers and Sons", description: "Ivan Turgenev", url: "samples/fathers-and-sons.txt" },
      { id: "the-idiot", label: "The Idiot", description: "Fyodor Dostoevsky", url: "samples/the-idiot.txt" },
      { id: "notes-from-underground", label: "Notes from Underground", description: "Fyodor Dostoevsky", url: "samples/notes-from-underground.txt" },
      { id: "demons", label: "Demons", description: "Fyodor Dostoevsky", url: "samples/demons.txt" },
      { id: "house-of-the-dead", label: "The House of the Dead", description: "Fyodor Dostoevsky", url: "samples/house-of-the-dead.txt" },
      { id: "eugene-onegin", label: "Eugene Onegin", description: "Alexander Pushkin", url: "samples/eugene-onegin.txt" },
      { id: "chekhov-duel-stories", label: "The Duel and Other Stories", description: "Anton Chekhov", url: "samples/chekhov-duel-stories.txt" }
    ]
  },
  {
    id: "socialist-literature",
    label: "Socialist & Communist",
    description: "Political essays and utopian classics.",
    samples: [
      { id: "communist-manifesto", label: "The Communist Manifesto", description: "Karl Marx & Friedrich Engels", url: "samples/communist-manifesto.txt" },
      { id: "conquest-of-bread", label: "The Conquest of Bread", description: "Peter Kropotkin", url: "samples/conquest-of-bread.txt" },
      { id: "state-and-revolution", label: "The State and Revolution", description: "Vladimir Lenin", url: "samples/state-and-revolution.txt" },
      { id: "looking-backward", label: "Looking Backward", description: "Edward Bellamy", url: "samples/looking-backward.txt" },
      { id: "utopian-and-scientific", label: "Socialism: Utopian and Scientific", description: "Friedrich Engels", url: "samples/utopian-and-scientific.txt" },
      { id: "working-class-england", label: "The Condition of the Working Class in England", description: "Friedrich Engels", url: "samples/working-class-england.txt" },
      { id: "soul-of-man-under-socialism", label: "The Soul of Man Under Socialism", description: "Oscar Wilde", url: "samples/soul-of-man-under-socialism.txt" },
      { id: "letter-to-american-workingmen", label: "A Letter to American Workingmen", description: "Vladimir Lenin", url: "samples/letter-to-american-workingmen.txt" }
    ]
  },
  {
    id: "victorian-social",
    label: "Victorian Social Novels",
    description: "Industrial Britain and social reform classics.",
    samples: [
      { id: "victorian-hard-times", label: "Hard Times", description: "Charles Dickens", url: "samples/hard-times.txt" },
      { id: "victorian-north-south", label: "North and South", description: "Elizabeth Gaskell", url: "samples/north-and-south.txt" }
    ]
  },
  {
    id: "french-classics",
    label: "French Classics",
    description: "Epic French novels and literary pillars.",
    samples: [
      { id: "french-les-miserables", label: "Les Misérables", description: "Victor Hugo", url: "samples/les-miserables.txt" },
      { id: "french-monte-cristo", label: "The Count of Monte Cristo", description: "Alexandre Dumas", url: "samples/count-of-monte-cristo.txt" }
    ]
  },
  {
    id: "ancient-classics",
    label: "Ancient Classics",
    description: "Foundational epics from the ancient world.",
    samples: [
      { id: "ancient-iliad", label: "The Iliad", description: "Homer", url: "samples/iliad.txt" },
      { id: "ancient-odyssey", label: "The Odyssey", description: "Homer", url: "samples/odyssey.txt" }
    ]
  },
  {
    id: "philosophy-essays",
    label: "Philosophy & Essays",
    description: "Timeless reflections and political thought.",
    samples: [
      { id: "philosophy-meditations", label: "Meditations", description: "Marcus Aurelius", url: "samples/meditations.txt" },
      { id: "philosophy-on-liberty", label: "On Liberty", description: "John Stuart Mill", url: "samples/on-liberty.txt" }
    ]
  },
  {
    id: "transcendentalists",
    label: "American Transcendentalists",
    description: "Nature, self-reliance, and the inner life.",
    samples: [
      { id: "transcendental-walden", label: "Walden", description: "Henry David Thoreau", url: "samples/walden.txt" },
      { id: "transcendental-self-reliance", label: "Self-Reliance", description: "Ralph Waldo Emerson", url: "samples/self-reliance.txt" }
    ]
  },
  {
    id: "poetry-collections",
    label: "Poetry Collections",
    description: "Landmark poetry volumes and anthologies.",
    samples: [
      { id: "poetry-leaves-of-grass", label: "Leaves of Grass", description: "Walt Whitman", url: "samples/leaves-of-grass.txt" },
      { id: "poetry-emily-dickinson", label: "Poems of Emily Dickinson", description: "Emily Dickinson", url: "samples/emily-dickinson-poems.txt" }
    ]
  },
  {
    id: "plays-drama",
    label: "Plays & Drama",
    description: "Stage classics and dramatic works.",
    samples: [
      { id: "plays-hamlet", label: "Hamlet", description: "William Shakespeare", url: "samples/hamlet.txt" },
      { id: "plays-importance-earnest", label: "The Importance of Being Earnest", description: "Oscar Wilde", url: "samples/importance-of-being-earnest.txt" }
    ]
  }
];

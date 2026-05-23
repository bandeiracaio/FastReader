export type SampleSource = {
  id: string;
  label: string;
  description: string;
  url: string;
};

export type SampleCategory = {
  id: string;
  label: string;
  description: string;
  samples: SampleSource[];
};

export const LONG_SAMPLE_CATEGORIES: SampleCategory[] = [
  {
    "id": "english-classics",
    "label": "English Classics",
    "description": "Victorian, gothic, and adventure staples.",
    "samples": [
      {
        "id": "pride-and-prejudice",
        "label": "Pride and Prejudice",
        "description": "Jane Austen",
        "url": "samples/pride-and-prejudice.txt"
      },
      {
        "id": "moby-dick",
        "label": "Moby-Dick",
        "description": "Herman Melville",
        "url": "samples/moby-dick.txt"
      },
      {
        "id": "dracula",
        "label": "Dracula",
        "description": "Bram Stoker",
        "url": "samples/dracula.txt"
      },
      {
        "id": "frankenstein",
        "label": "Frankenstein",
        "description": "Mary Shelley",
        "url": "samples/frankenstein.txt"
      },
      {
        "id": "alice-wonderland",
        "label": "Alice’s Adventures in Wonderland",
        "description": "Lewis Carroll",
        "url": "samples/alice-wonderland.txt"
      },
      {
        "id": "sherlock-holmes",
        "label": "The Adventures of Sherlock Holmes",
        "description": "Arthur Conan Doyle",
        "url": "samples/sherlock-holmes.txt"
      },
      {
        "id": "tale-of-two-cities",
        "label": "A Tale of Two Cities",
        "description": "Charles Dickens",
        "url": "samples/tale-of-two-cities.txt"
      },
      {
        "id": "dorian-gray",
        "label": "The Picture of Dorian Gray",
        "description": "Oscar Wilde",
        "url": "samples/dorian-gray.txt"
      },
      {
        "id": "time-machine",
        "label": "The Time Machine",
        "description": "H. G. Wells",
        "url": "samples/time-machine.txt"
      },
      {
        "id": "war-of-worlds",
        "label": "The War of the Worlds",
        "description": "H. G. Wells",
        "url": "samples/war-of-worlds.txt"
      },
      {
        "id": "great-expectations",
        "label": "Great Expectations",
        "description": "Charles Dickens",
        "url": "samples/great-expectations.txt"
      },
      {
        "id": "little-women",
        "label": "Little Women",
        "description": "Louisa May Alcott",
        "url": "samples/little-women.txt"
      },
      {
        "id": "jane-eyre",
        "label": "Jane Eyre",
        "description": "Charlotte Brontë",
        "url": "samples/jane-eyre.txt"
      },
      {
        "id": "treasure-island",
        "label": "Treasure Island",
        "description": "Robert Louis Stevenson",
        "url": "samples/treasure-island.txt"
      },
      {
        "id": "call-of-the-wild",
        "label": "The Call of the Wild",
        "description": "Jack London",
        "url": "samples/call-of-the-wild.txt"
      },
      {
        "id": "scarlet-letter",
        "label": "The Scarlet Letter",
        "description": "Nathaniel Hawthorne",
        "url": "samples/scarlet-letter.txt"
      },
      {
        "id": "english-classics-1342",
        "label": "Pride and Prejudice",
        "description": "Austen, Jane",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/1342.txt.utf-8"
      },
      {
        "id": "english-classics-161",
        "label": "Sense and Sensibility",
        "description": "Austen, Jane",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/161/161-0.txt"
      },
      {
        "id": "english-classics-158",
        "label": "Emma",
        "description": "Austen, Jane",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/158.txt.utf-8"
      },
      {
        "id": "english-classics-105",
        "label": "Persuasion",
        "description": "Austen, Jane",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/105.txt.utf-8"
      },
      {
        "id": "english-classics-121",
        "label": "Northanger Abbey",
        "description": "Austen, Jane",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/121.txt.utf-8"
      },
      {
        "id": "english-classics-141",
        "label": "Mansfield Park",
        "description": "Austen, Jane",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/141.txt.utf-8"
      },
      {
        "id": "english-classics-31100",
        "label": "The Complete Project Gutenberg Works of Jane Austen: A Linked Index of all PG Editions of Jane Austen",
        "description": "Austen, Jane",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/31100.txt.utf-8"
      },
      {
        "id": "english-classics-42671",
        "label": "Pride and Prejudice",
        "description": "Austen, Jane",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/42671.txt.utf-8"
      },
      {
        "id": "english-classics-42078",
        "label": "The Letters of Jane Austen: Selected from the compilation of her great nephew, Edward, Lord Bradbourne",
        "description": "Austen, Jane",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/42078.txt.utf-8"
      },
      {
        "id": "english-classics-1212",
        "label": "Love and Freindship [sic]",
        "description": "Austen, Jane",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/1212.txt.utf-8"
      },
      {
        "id": "english-classics-37431",
        "label": "Pride and Prejudice, a play founded on Jane Austen's novel",
        "description": "Austen, Jane",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/37431.txt.utf-8"
      },
      {
        "id": "english-classics-21839",
        "label": "Sense and Sensibility",
        "description": "Austen, Jane",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/21839.txt.utf-8"
      },
      {
        "id": "english-classics-19839",
        "label": "Emma",
        "description": "Austen, Jane",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/19839/19839.txt"
      },
      {
        "id": "english-classics-26301",
        "label": "Pride and Prejudice",
        "description": "Austen, Jane",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/26301/26301-readme.txt"
      },
      {
        "id": "english-classics-22964",
        "label": "Sense and Sensibility",
        "description": "Austen, Jane",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/22964/22964-readme.txt"
      },
      {
        "id": "english-classics-946",
        "label": "Lady Susan",
        "description": "Austen, Jane",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/946.txt.utf-8"
      },
      {
        "id": "english-classics-22962",
        "label": "Mansfield Park",
        "description": "Austen, Jane",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/22962/22962-readme.txt"
      },
      {
        "id": "english-classics-20687",
        "label": "Pride and Prejudice",
        "description": "Austen, Jane",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/20687/20687-readme.txt"
      },
      {
        "id": "english-classics-20686",
        "label": "Pride and Prejudice",
        "description": "Austen, Jane",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/20686/20686-readme.txt"
      },
      {
        "id": "english-classics-22536",
        "label": "Jane Austen, Her Life and Letters: A Family Record",
        "description": "Austen-Leigh, William",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/22536.txt.utf-8"
      },
      {
        "id": "english-classics-20682",
        "label": "Northanger Abbey",
        "description": "Austen, Jane",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/20682/20682-readme.txt"
      },
      {
        "id": "english-classics-17797",
        "label": "Memoir of Jane Austen",
        "description": "Austen-Leigh, James Edward",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/17797.txt.utf-8"
      },
      {
        "id": "english-classics-70809",
        "label": "Jane Austen and her works",
        "description": "Tytler, Sarah",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/70809.txt.utf-8"
      },
      {
        "id": "english-classics-22963",
        "label": "Persuasion",
        "description": "Austen, Jane",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/22963/22963-readme.txt"
      },
      {
        "id": "english-classics-52622",
        "label": "Jane Austen and Her Times",
        "description": "Mitton, G. E. (Geraldine Edith)",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/52622.txt.utf-8"
      },
      {
        "id": "english-classics-63569",
        "label": "The Watsons: By Jane Austen, Concluded by L. Oulton",
        "description": "Austen, Jane",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/63569.txt.utf-8"
      },
      {
        "id": "english-classics-39897",
        "label": "Discoveries Among the Ruins of Nineveh and Babylon",
        "description": "Layard, Austen Henry",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/39897.txt.utf-8"
      },
      {
        "id": "english-classics-54569",
        "label": "Jane Austen and Her Country-house Comedy",
        "description": "Helm, W. H. (William Henry)",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/54569.txt.utf-8"
      },
      {
        "id": "english-classics-43741",
        "label": "Old friends and new fancies : $b an imaginary sequel to the novels of Jane Austen",
        "description": "Brinton, Sybil G. (Sybil Grace)",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/43741.txt.utf-8"
      },
      {
        "id": "english-classics-74233",
        "label": "Fragment of a novel written by Jane Austen, January-March 1817 : $b Now first printed from the manuscript",
        "description": "Austen, Jane",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/74233.txt.utf-8"
      },
      {
        "id": "english-classics-22953",
        "label": "Lady Susan",
        "description": "Austen, Jane",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/22953/22953-readme.txt"
      },
      {
        "id": "english-classics-54066",
        "label": "The Younger Sister: A Novel, Volumes 1-3",
        "description": "Hubback, Mrs. (Catherine-Anne Austen)",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/54066.txt.utf-8"
      },
      {
        "id": "english-classics-69815",
        "label": "Jane Austen's sailor brothers: Being the adventures of Sir Francis Austen, G.C.B., Admiral of the Fleet and Rear-Admiral Charles Austen",
        "description": "Hubback, J. H. (John Henry)",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/69815.txt.utf-8"
      },
      {
        "id": "english-classics-77117",
        "label": "The Watsons",
        "description": "Austen, Jane",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/77117.txt.utf-8"
      },
      {
        "id": "english-classics-54010",
        "label": "The Younger Sister: A Novel, Vol. I.",
        "description": "Hubback, Mrs. (Catherine-Anne Austen)",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/54010.txt.utf-8"
      },
      {
        "id": "english-classics-54011",
        "label": "The Younger Sister: A Novel, Vol. II.",
        "description": "Hubback, Mrs. (Catherine-Anne Austen)",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/54011.txt.utf-8"
      },
      {
        "id": "english-classics-30435",
        "label": "A Book of Sibyls: Miss Barbauld, Miss Edgeworth, Mrs Opie, Miss Austen",
        "description": "Ritchie, Anne Thackeray",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/30435.txt.utf-8"
      },
      {
        "id": "english-classics-22954",
        "label": "Love and Freindship [sic]",
        "description": "Austen, Jane",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/22954/22954-readme.txt"
      },
      {
        "id": "english-classics-54012",
        "label": "The Younger Sister: A Novel, Vol. III.",
        "description": "Hubback, Mrs. (Catherine-Anne Austen)",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/54012.txt.utf-8"
      },
      {
        "id": "english-classics-70732",
        "label": "The old vicarage : $b A novel",
        "description": "Hubback, Mrs. (Catherine-Anne Austen)",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/70732.txt.utf-8"
      },
      {
        "id": "english-classics-33513",
        "label": "The Frightened Planet",
        "description": "Austen, Sidney",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/33513.txt.utf-8"
      },
      {
        "id": "english-classics-46",
        "label": "A Christmas Carol in Prose; Being a Ghost Story of Christmas",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/46.txt.utf-8"
      },
      {
        "id": "english-classics-98",
        "label": "A Tale of Two Cities",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/98/98-0.txt"
      },
      {
        "id": "english-classics-1400",
        "label": "Great Expectations",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/1400.txt.utf-8"
      },
      {
        "id": "english-classics-1023",
        "label": "Bleak House",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/1023.txt.utf-8"
      },
      {
        "id": "english-classics-730",
        "label": "Oliver Twist",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/730.txt.utf-8"
      },
      {
        "id": "english-classics-766",
        "label": "David Copperfield",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/766.txt.utf-8"
      },
      {
        "id": "english-classics-24022",
        "label": "A Christmas Carol",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/24022.txt.utf-8"
      },
      {
        "id": "english-classics-786",
        "label": "Hard Times",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/786.txt.utf-8"
      },
      {
        "id": "english-classics-19337",
        "label": "A Christmas Carol",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/19337.txt.utf-8"
      },
      {
        "id": "english-classics-1467",
        "label": "Some Christmas Stories",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/1467/1467-0.txt"
      },
      {
        "id": "english-classics-882",
        "label": "Sketches by Boz, Illustrative of Every-Day Life and Every-Day People",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/882/882-0.txt"
      },
      {
        "id": "english-classics-564",
        "label": "The Mystery of Edwin Drood",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/564.txt.utf-8"
      },
      {
        "id": "english-classics-580",
        "label": "The Pickwick Papers",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/580.txt.utf-8"
      },
      {
        "id": "english-classics-967",
        "label": "Nicholas Nickleby",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/967/967-0.txt"
      },
      {
        "id": "english-classics-25851",
        "label": "The Life of Charles Dickens, Vol. I-III, Complete",
        "description": "Forster, John",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/25851.txt.utf-8"
      },
      {
        "id": "english-classics-700",
        "label": "The Old Curiosity Shop",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/700.txt.utf-8"
      },
      {
        "id": "english-classics-917",
        "label": "Barnaby Rudge: A Tale of the Riots of 'Eighty",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/917/917-0.txt"
      },
      {
        "id": "english-classics-883",
        "label": "Our Mutual Friend",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/883.txt.utf-8"
      },
      {
        "id": "english-classics-675",
        "label": "American Notes",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/675/675-0.txt"
      },
      {
        "id": "english-classics-30368",
        "label": "A Christmas Carol: The original manuscript",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/30368.txt.utf-8"
      },
      {
        "id": "english-classics-678",
        "label": "The Cricket on the Hearth: A Fairy Tale of Home",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/678/678-0.txt"
      },
      {
        "id": "english-classics-963",
        "label": "Little Dorrit",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/963.txt.utf-8"
      },
      {
        "id": "english-classics-58157",
        "label": "Index of the Project Gutenberg Works of Charles Dickens",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/58157.txt.utf-8"
      },
      {
        "id": "english-classics-914",
        "label": "The Uncommercial Traveller",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/914/914-0.txt"
      },
      {
        "id": "english-classics-28198",
        "label": "A Budget of Christmas Tales by Charles Dickens and Others",
        "description": "Unknown",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/28198.txt.utf-8"
      },
      {
        "id": "english-classics-821",
        "label": "Dombey and Son",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/821.txt.utf-8"
      },
      {
        "id": "english-classics-25852",
        "label": "The Letters of Charles Dickens. Vol. 1, 1833-1856",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/25852.txt.utf-8"
      },
      {
        "id": "english-classics-1289",
        "label": "Three Ghost Stories",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/1289/1289-0.txt"
      },
      {
        "id": "english-classics-47529",
        "label": "Oliver Twist, Vol. 1 (of 3)",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/47529.txt.utf-8"
      },
      {
        "id": "english-classics-25853",
        "label": "The Letters of Charles Dickens. Vol. 2, 1857-1870",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/25853.txt.utf-8"
      },
      {
        "id": "english-classics-653",
        "label": "The Chimes: A Goblin Story of Some Bells That Rang an Old Year out and a New Year In",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/653/653-0.txt"
      },
      {
        "id": "english-classics-968",
        "label": "Martin Chuzzlewit",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/968/968-0.txt"
      },
      {
        "id": "english-classics-47530",
        "label": "Oliver Twist, Vol. 2 (of 3)",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/47530.txt.utf-8"
      },
      {
        "id": "english-classics-23452",
        "label": "The Trial of William Tinkling: Written by Himself at the Age of 8 Years",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/23452.txt.utf-8"
      },
      {
        "id": "english-classics-22362",
        "label": "Appreciations and Criticisms of the Works of Charles Dickens",
        "description": "Chesterton, G. K. (Gilbert Keith)",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/22362.txt.utf-8"
      },
      {
        "id": "english-classics-46675",
        "label": "Oliver Twist; or, The Parish Boy's Progress. Illustrated",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/46675.txt.utf-8"
      },
      {
        "id": "english-classics-40729",
        "label": "\"Old Scrooge\": A Christmas Carol in Five Staves.: Dramatized from Charles Dickens' Celebrated Christmas Story.",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/40729.txt.utf-8"
      },
      {
        "id": "english-classics-644",
        "label": "The Haunted Man and the Ghost's Bargain",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/644.txt.utf-8"
      },
      {
        "id": "english-classics-9744",
        "label": "David Copperfield",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/9744/9744-readme.txt"
      },
      {
        "id": "english-classics-31394",
        "label": "A Week's Tramp in Dickens-Land: Together with Personal Reminiscences of the 'Inimitable Boz' Therein Collected",
        "description": "Hughes, William R. (William Richard)",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/31394.txt.utf-8"
      },
      {
        "id": "english-classics-824",
        "label": "Speeches: Literary and Social",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/824/824-0.txt"
      },
      {
        "id": "english-classics-41739",
        "label": "A Christmas Carol; Or, The Miser's Warning!: (Adapted from Charles Dickens' Celebrated Work.)",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/41739.txt.utf-8"
      },
      {
        "id": "english-classics-9715",
        "label": "Little Dorrit",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/9715/9715-readme.txt"
      },
      {
        "id": "english-classics-699",
        "label": "A Child's History of England",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/699.txt.utf-8"
      },
      {
        "id": "english-classics-25854",
        "label": "The Letters of Charles Dickens. Vol. 3, 1836-1870",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/25854.txt.utf-8"
      },
      {
        "id": "english-classics-650",
        "label": "Pictures from Italy",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/650/650-0.txt"
      },
      {
        "id": "english-classics-19505",
        "label": "A Christmas Carol",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/19505/19505.txt"
      },
      {
        "id": "english-classics-40410",
        "label": "Dickens and His Illustrators: Cruikshank, Seymour, Buss, \"Phiz,\" Cattermole, Leech, Doyle, Stanfield, Maclise, Tenniel, Frank Stone, Landseer, Palmer, Topham, Marcus Stone, and Luke Fildes; 2nd. Ed.",
        "description": "Kitton, Frederic George",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/40410.txt.utf-8"
      },
      {
        "id": "english-classics-9703",
        "label": "Dombey and Son",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/9703/9703-readme.txt"
      },
      {
        "id": "english-classics-9695",
        "label": "Bleak House",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/9695/9695-readme.txt"
      },
      {
        "id": "english-classics-9699",
        "label": "Martin Chuzzlewit",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/9699/9699-readme.txt"
      },
      {
        "id": "english-classics-9725",
        "label": "Nicholas Nickleby",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/9725/9725-readme.txt"
      },
      {
        "id": "english-classics-16787",
        "label": "Life of Charles Dickens",
        "description": "Marzials, Frank T. (Frank Thomas), Sir",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/16787.txt.utf-8"
      },
      {
        "id": "english-classics-9719",
        "label": "Our Mutual Friend",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/9719/9719-readme.txt"
      },
      {
        "id": "english-classics-8608",
        "label": "Great Expectations",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/8608/8608-readme.txt"
      },
      {
        "id": "english-classics-9727",
        "label": "Oliver Twist",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/9727/9727-readme.txt"
      },
      {
        "id": "english-classics-9732",
        "label": "Barnaby Rudge",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/9732/9732-readme.txt"
      },
      {
        "id": "english-classics-16595",
        "label": "Charles Dickens and Music",
        "description": "Lightwood, James T. (James Thomas)",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/16595.txt.utf-8"
      },
      {
        "id": "english-classics-72466",
        "label": "Charles Dickens and other Victorians",
        "description": "Quiller-Couch, Arthur",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/72466.txt.utf-8"
      },
      {
        "id": "english-classics-21332",
        "label": "Charles Dickens as a Reader",
        "description": "Kent, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/21332.txt.utf-8"
      },
      {
        "id": "english-classics-40723",
        "label": "The Battle of Life: A Love Story",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/40723.txt.utf-8"
      },
      {
        "id": "english-classics-20673",
        "label": "A Christmas Carol",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/20673/20673-readme.txt"
      },
      {
        "id": "english-classics-30127",
        "label": "Tales from Dickens",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/30127.txt.utf-8"
      },
      {
        "id": "english-classics-56105",
        "label": "The Dickens Country",
        "description": "Kitton, Frederic George",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/56105.txt.utf-8"
      },
      {
        "id": "english-classics-38652",
        "label": "Rambles in Dickens' Land",
        "description": "Allbut, Robert",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/38652.txt.utf-8"
      },
      {
        "id": "english-classics-47531",
        "label": "Oliver Twist, Vol. 3 (of 3)",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/47531.txt.utf-8"
      },
      {
        "id": "english-classics-7869",
        "label": "A Tale of Two Cities",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/7869/7869-readme.txt"
      },
      {
        "id": "english-classics-47535",
        "label": "The Posthumous Papers of the Pickwick Club, v. 2 (of 2)",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/47535.txt.utf-8"
      },
      {
        "id": "english-classics-924",
        "label": "To Be Read at Dusk",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/924/924-0.txt"
      },
      {
        "id": "english-classics-9733",
        "label": "Sketches by Boz, illustrative of everyday life and every-day people",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/9733/9733-readme.txt"
      },
      {
        "id": "english-classics-588",
        "label": "Master Humphrey's Clock",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/588/588-0.txt"
      },
      {
        "id": "english-classics-37284",
        "label": "Dickens As an Educator",
        "description": "Hughes, James L. (James Laughlin)",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/37284.txt.utf-8"
      },
      {
        "id": "english-classics-9690",
        "label": "A Child's History of England",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/9690/9690-readme.txt"
      },
      {
        "id": "english-classics-68682",
        "label": "Charles Dickens: A critical study",
        "description": "Chesterton, G. K. (Gilbert Keith)",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/68682.txt.utf-8"
      },
      {
        "id": "english-classics-676",
        "label": "The Battle of Life",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/676/676-0.txt"
      },
      {
        "id": "english-classics-807",
        "label": "Hunted Down: The Detective Stories of Charles Dickens",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/807/807-0.txt"
      },
      {
        "id": "english-classics-41894",
        "label": "Christmas-Tide",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/41894.txt.utf-8"
      },
      {
        "id": "english-classics-22449",
        "label": "No Thoroughfare",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/22449/22449-readme.txt"
      },
      {
        "id": "english-classics-9730",
        "label": "The Pickwick Papers",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/9730/9730-readme.txt"
      },
      {
        "id": "english-classics-49125",
        "label": "Stories from Dickens",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/49125.txt.utf-8"
      },
      {
        "id": "english-classics-9702",
        "label": "The Old Curiosity Shop",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/9702/9702-readme.txt"
      },
      {
        "id": "english-classics-32241",
        "label": "Dickens' Stories About Children Every Child Can Read",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/32241.txt.utf-8"
      },
      {
        "id": "english-classics-42232",
        "label": "A Child's Dream of a Star",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/42232.txt.utf-8"
      },
      {
        "id": "english-classics-30390",
        "label": "Dickens' London",
        "description": "Mansfield, M. F. (Milburg Francisco)",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/30390.txt.utf-8"
      },
      {
        "id": "english-classics-47534",
        "label": "The Posthumous Papers of the Pickwick Club, v. 1 (of 2)",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/47534.txt.utf-8"
      },
      {
        "id": "english-classics-23344",
        "label": "The Magic Fishbone: A Holiday Romance from the Pen of Miss Alice Rainbird, Aged 7",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/23344.txt.utf-8"
      },
      {
        "id": "english-classics-43207",
        "label": "Scenes and Characters from the Works of Charles Dickens: Being Eight Hundred and Sixty-six Pictures Printed from the Original Wood Blocks",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/43207.txt.utf-8"
      },
      {
        "id": "english-classics-888",
        "label": "The Lazy Tour of Two Idle Apprentices",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/888/888-0.txt"
      },
      {
        "id": "english-classics-1392",
        "label": "The Seven Poor Travellers",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/1392.txt.utf-8"
      },
      {
        "id": "english-classics-912",
        "label": "Mudfog and Other Sketches",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/912/912-0.txt"
      },
      {
        "id": "english-classics-927",
        "label": "The Lamplighter",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/927/927-0.txt"
      },
      {
        "id": "english-classics-872",
        "label": "Reprinted Pieces",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/872/872-0.txt"
      },
      {
        "id": "english-classics-1407",
        "label": "A Message from the Sea",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/1407.txt.utf-8"
      },
      {
        "id": "english-classics-36714",
        "label": "Dickens",
        "description": "Ward, Adolphus William, Sir",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/36714.txt.utf-8"
      },
      {
        "id": "english-classics-43111",
        "label": "The Personal History of David Copperfield",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/43111.txt.utf-8"
      },
      {
        "id": "english-classics-9709",
        "label": "Hard Times",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/9709/9709-readme.txt"
      },
      {
        "id": "english-classics-55550",
        "label": "A Valiant Ignorance; vol. 3 of 3: A Novel in Three Volumes",
        "description": "Dickens, Mary Angela",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/55550.txt.utf-8"
      },
      {
        "id": "english-classics-9741",
        "label": "The Uncommercial Traveller",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/9741/9741-readme.txt"
      },
      {
        "id": "english-classics-52125",
        "label": "Nell and Her Grandfather, Told from Charles Dickens's \"The Old Curiosity Shop\"",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/52125.txt.utf-8"
      },
      {
        "id": "english-classics-27924",
        "label": "Mugby Junction",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/27924.txt.utf-8"
      },
      {
        "id": "english-classics-1414",
        "label": "Somebody's Luggage",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/1414.txt.utf-8"
      },
      {
        "id": "english-classics-9705",
        "label": "The Mystery of Edwin Drood",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/9705/9705-readme.txt"
      },
      {
        "id": "english-classics-738",
        "label": "The Puzzle of Dickens's Last Plot",
        "description": "Lang, Andrew",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/738/738-0.txt"
      },
      {
        "id": "english-classics-49683",
        "label": "Cruikshank's Water Colours",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/49683.txt.utf-8"
      },
      {
        "id": "english-classics-9696",
        "label": "A Christmas Carol",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/9696/9696.txt"
      },
      {
        "id": "english-classics-809",
        "label": "Holiday Romance",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/809/809-0.txt"
      },
      {
        "id": "english-classics-1415",
        "label": "Doctor Marigold",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/1415.txt.utf-8"
      },
      {
        "id": "english-classics-75856",
        "label": "The children of Dickens",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/75856.txt.utf-8"
      },
      {
        "id": "english-classics-42908",
        "label": "Dickensian Inns & Taverns",
        "description": "Matz, B. W. (Bertram Waldrom)",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/42908.txt.utf-8"
      },
      {
        "id": "english-classics-922",
        "label": "Sunday Under Three Heads",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/922/922-0.txt"
      },
      {
        "id": "english-classics-11227",
        "label": "Ten Boys from Dickens",
        "description": "Sweetser, Kate Dickinson",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/11227.txt.utf-8"
      },
      {
        "id": "english-classics-61760",
        "label": "Charles Dickens",
        "description": "Chesterton, G. K. (Gilbert Keith)",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/61760.txt.utf-8"
      },
      {
        "id": "english-classics-1423",
        "label": "No Thoroughfare",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/1423.txt.utf-8"
      },
      {
        "id": "english-classics-20795",
        "label": "The Cricket on the Hearth",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/20795.txt.utf-8"
      },
      {
        "id": "english-classics-916",
        "label": "Sketches of Young Couples",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/916/916-0.txt"
      },
      {
        "id": "english-classics-34112",
        "label": "In Jail with Charles Dickens",
        "description": "Trumble, Alfred",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/34112.txt.utf-8"
      },
      {
        "id": "english-classics-35536",
        "label": "The Poems and Verses of Charles Dickens",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/35536.txt.utf-8"
      },
      {
        "id": "english-classics-37581",
        "label": "The Cricket on the Hearth: A Fairy Tale of Home",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/37581.txt.utf-8"
      },
      {
        "id": "english-classics-36311",
        "label": "The Problem of 'Edwin Drood': A Study in the Methods of Dickens",
        "description": "Nicoll, W. Robertson (William Robertson), Sir",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/36311.txt.utf-8"
      },
      {
        "id": "english-classics-9717",
        "label": "The Lazy Tour of Two Idle Apprentices",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/9717/9717-readme.txt"
      },
      {
        "id": "english-classics-1394",
        "label": "The Holly-Tree",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/1394.txt.utf-8"
      },
      {
        "id": "english-classics-918",
        "label": "Sketches of Young Gentlemen",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/918/918-0.txt"
      },
      {
        "id": "english-classics-1406",
        "label": "The Perils of Certain English Prisoners",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/1406.txt.utf-8"
      },
      {
        "id": "english-classics-810",
        "label": "George Silverman's Explanation",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/810/810-0.txt"
      },
      {
        "id": "english-classics-25985",
        "label": "Bardell v. Pickwick",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/25985.txt.utf-8"
      },
      {
        "id": "english-classics-70690",
        "label": "Trial of John Jasper, lay precentor of Cloisterham Cathedral in the County of Kent, for the murder of Edwin Drood, engineer",
        "description": "Dickens Fellowship (London, England)",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/70690.txt.utf-8"
      },
      {
        "id": "english-classics-27234",
        "label": "My Father as I Recall Him",
        "description": "Dickens, Mamie",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/27234.txt.utf-8"
      },
      {
        "id": "english-classics-1465",
        "label": "The Wreck of the Golden Mary",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/1465.txt.utf-8"
      },
      {
        "id": "english-classics-61193",
        "label": "Mr. Pickwick's Christmas: Being an Account of the Pickwickians' Christmas at the Manor Farm, of the Adventures There; the Tale of the Goblin Who Stole a Sexton, and of the Famous Sports on the Ice",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/61193.txt.utf-8"
      },
      {
        "id": "english-classics-2324",
        "label": "A House to Let",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/2324/2324-0.txt"
      },
      {
        "id": "english-classics-37121",
        "label": "Charles Dickens' Children Stories",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/37121.txt.utf-8"
      },
      {
        "id": "english-classics-1435",
        "label": "Miscellaneous Papers",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/1435/1435-0.txt"
      },
      {
        "id": "english-classics-11126",
        "label": "Ten Girls from Dickens",
        "description": "Sweetser, Kate Dickinson",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/11126.txt.utf-8"
      },
      {
        "id": "english-classics-1419",
        "label": "Mugby Junction",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/1419.txt.utf-8"
      },
      {
        "id": "english-classics-61668",
        "label": "Stories of Intellect",
        "description": "Hawthorne, Nathaniel",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/61668.txt.utf-8"
      },
      {
        "id": "english-classics-1421",
        "label": "Mrs. Lirriper's Legacy",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/1421.txt.utf-8"
      },
      {
        "id": "english-classics-1416",
        "label": "Mrs. Lirriper's Lodgings",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/1416.txt.utf-8"
      },
      {
        "id": "english-classics-49927",
        "label": "Pearl-Fishing; Choice Stories from Dickens' Household Words; First Series",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/49927.txt.utf-8"
      },
      {
        "id": "english-classics-50334",
        "label": "Pearl-Fishing; Choice Stories from Dickens' Household Words; Second Series",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/50334.txt.utf-8"
      },
      {
        "id": "english-classics-1413",
        "label": "Tom Tiddler's Ground",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/1413.txt.utf-8"
      },
      {
        "id": "english-classics-27572",
        "label": "Dickens-Land",
        "description": "Nicklin, J. A. (John Arnold)",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/27572.txt.utf-8"
      },
      {
        "id": "english-classics-23765",
        "label": "Captain Boldheart & the Latin-Grammar Master: A Holiday Romance from the Pen of Lieut-Col. Robin Redforth, aged 9",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/23765.txt.utf-8"
      },
      {
        "id": "english-classics-1422",
        "label": "Going into Society",
        "description": "Dickens, Charles",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/1422.txt.utf-8"
      }
    ]
  },
  {
    "id": "russian-classics",
    "label": "Russian Classics",
    "description": "Epic novels and realist masterpieces.",
    "samples": [
      {
        "id": "war-and-peace",
        "label": "War and Peace",
        "description": "Leo Tolstoy",
        "url": "samples/war-and-peace.txt"
      },
      {
        "id": "anna-karenina",
        "label": "Anna Karenina",
        "description": "Leo Tolstoy",
        "url": "samples/anna-karenina.txt"
      },
      {
        "id": "crime-and-punishment",
        "label": "Crime and Punishment",
        "description": "Fyodor Dostoevsky",
        "url": "samples/crime-and-punishment.txt"
      },
      {
        "id": "brothers-karamazov",
        "label": "The Brothers Karamazov",
        "description": "Fyodor Dostoevsky",
        "url": "samples/brothers-karamazov.txt"
      },
      {
        "id": "dead-souls",
        "label": "Dead Souls",
        "description": "Nikolai Gogol",
        "url": "samples/dead-souls.txt"
      },
      {
        "id": "fathers-and-sons",
        "label": "Fathers and Sons",
        "description": "Ivan Turgenev",
        "url": "samples/fathers-and-sons.txt"
      },
      {
        "id": "the-idiot",
        "label": "The Idiot",
        "description": "Fyodor Dostoevsky",
        "url": "samples/the-idiot.txt"
      },
      {
        "id": "notes-from-underground",
        "label": "Notes from Underground",
        "description": "Fyodor Dostoevsky",
        "url": "samples/notes-from-underground.txt"
      },
      {
        "id": "demons",
        "label": "Demons",
        "description": "Fyodor Dostoevsky",
        "url": "samples/demons.txt"
      },
      {
        "id": "house-of-the-dead",
        "label": "The House of the Dead",
        "description": "Fyodor Dostoevsky",
        "url": "samples/house-of-the-dead.txt"
      },
      {
        "id": "eugene-onegin",
        "label": "Eugene Onegin",
        "description": "Alexander Pushkin",
        "url": "samples/eugene-onegin.txt"
      },
      {
        "id": "chekhov-duel-stories",
        "label": "The Duel and Other Stories",
        "description": "Anton Chekhov",
        "url": "samples/chekhov-duel-stories.txt"
      },
      {
        "id": "russian-classics-2554",
        "label": "Crime and Punishment",
        "description": "Dostoyevsky, Fyodor",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/2554.txt.utf-8"
      },
      {
        "id": "russian-classics-28054",
        "label": "The Brothers Karamazov",
        "description": "Dostoyevsky, Fyodor",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/28054.txt.utf-8"
      },
      {
        "id": "russian-classics-36034",
        "label": "White nights, and other stories",
        "description": "Dostoyevsky, Fyodor",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/36034.txt.utf-8"
      },
      {
        "id": "russian-classics-600",
        "label": "Notes from the Underground",
        "description": "Dostoyevsky, Fyodor",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/600.txt.utf-8"
      },
      {
        "id": "russian-classics-2638",
        "label": "The Idiot",
        "description": "Dostoyevsky, Fyodor",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/2638.txt.utf-8"
      },
      {
        "id": "russian-classics-8578",
        "label": "The Grand Inquisitor",
        "description": "Dostoyevsky, Fyodor",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/8578.txt.utf-8"
      },
      {
        "id": "russian-classics-8117",
        "label": "The possessed : $b or, The devils",
        "description": "Dostoyevsky, Fyodor",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/8117.txt.utf-8"
      },
      {
        "id": "russian-classics-2197",
        "label": "The Gambler",
        "description": "Dostoyevsky, Fyodor",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/2197/2197-0.txt"
      },
      {
        "id": "russian-classics-59196",
        "label": "Index of the Project Gutenberg Works of Fyodor Dostoevsky",
        "description": "Dostoyevsky, Fyodor",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/59196.txt.utf-8"
      },
      {
        "id": "russian-classics-40745",
        "label": "Short Stories",
        "description": "Dostoyevsky, Fyodor",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/40745.txt.utf-8"
      },
      {
        "id": "russian-classics-37536",
        "label": "The house of the dead : $b or, Prison life in Siberia",
        "description": "Dostoyevsky, Fyodor",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/37536.txt.utf-8"
      },
      {
        "id": "russian-classics-2302",
        "label": "Poor Folk",
        "description": "Dostoyevsky, Fyodor",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/2302/2302-0.txt"
      },
      {
        "id": "russian-classics-57050",
        "label": "Stavrogin's Confession and The Plan of The Life of a Great Sinner: With Introductory and Explanatory Notes",
        "description": "Dostoyevsky, Fyodor",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/57050.txt.utf-8"
      },
      {
        "id": "russian-classics-38241",
        "label": "Uncle's Dream; and The Permanent Husband",
        "description": "Dostoyevsky, Fyodor",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/38241.txt.utf-8"
      },
      {
        "id": "russian-classics-6536",
        "label": "Notes from the Underground",
        "description": "Dostoyevsky, Fyodor",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/6536/6536-readme.txt"
      },
      {
        "id": "russian-classics-12144",
        "label": "The Continental Classics, Volume XVIII., Mystery Tales: Including Stories by Feodor Mikhailovitch Dostoyevsky, Jorgen Wilhelm; Bergsoe and Bernhard Severin Ingemann",
        "description": "Various",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/12144.txt.utf-8"
      },
      {
        "id": "russian-classics-2600",
        "label": "War and Peace",
        "description": "Tolstoy, Leo, graf",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/2600.txt.utf-8"
      },
      {
        "id": "russian-classics-1399",
        "label": "Anna Karenina",
        "description": "Tolstoy, Leo, graf",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/1399.txt.utf-8"
      },
      {
        "id": "russian-classics-64908",
        "label": "What Is Art?",
        "description": "Tolstoy, Leo, graf",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/64908.txt.utf-8"
      },
      {
        "id": "russian-classics-6157",
        "label": "What Men Live By, and Other Tales",
        "description": "Tolstoy, Leo, graf",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/6157.txt.utf-8"
      },
      {
        "id": "russian-classics-43302",
        "label": "\"The Kingdom of God Is Within You\": Christianity Not as a Mystic Religion but as a New Theory of Life",
        "description": "Tolstoy, Leo, graf",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/43302.txt.utf-8"
      },
      {
        "id": "russian-classics-986",
        "label": "Master and Man",
        "description": "Tolstoy, Leo, graf",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/986/986-0.txt"
      },
      {
        "id": "russian-classics-1938",
        "label": "Resurrection",
        "description": "Tolstoy, Leo, graf",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/1938/1938-0.txt"
      },
      {
        "id": "russian-classics-59195",
        "label": "Index of the Project Gutenberg Works of Leon Tolstoy",
        "description": "Tolstoy, Leo, graf",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/59195.txt.utf-8"
      },
      {
        "id": "russian-classics-689",
        "label": "The Kreutzer Sonata and Other Stories",
        "description": "Tolstoy, Leo, graf",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/689.txt.utf-8"
      },
      {
        "id": "russian-classics-28920",
        "label": "War and Peace, Book 01: 1805",
        "description": "Tolstoy, Leo, graf",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/28920/28920_readme.txt"
      },
      {
        "id": "russian-classics-38616",
        "label": "Where Love is There God is Also",
        "description": "Tolstoy, Leo, graf",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/38616.txt.utf-8"
      },
      {
        "id": "russian-classics-7176",
        "label": "A Letter to a Hindu",
        "description": "Tolstoy, Leo, graf",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/7176.txt.utf-8"
      },
      {
        "id": "russian-classics-38025",
        "label": "Fables for Children, Stories for Children, Natural Science Stories, Popular Education, Decembrists, Moral Tales",
        "description": "Tolstoy, Leo, graf",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/38025.txt.utf-8"
      },
      {
        "id": "russian-classics-19680",
        "label": "Childhood",
        "description": "Tolstoy, Leo, graf",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/19680/19680.txt"
      },
      {
        "id": "russian-classics-52242",
        "label": "The Life of Tolstoy: First Fifty Years: Fifth Edition",
        "description": "Maude, Aylmer",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/52242.txt.utf-8"
      },
      {
        "id": "russian-classics-2142",
        "label": "Childhood",
        "description": "Tolstoy, Leo, graf",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/2142/2142-0.txt"
      },
      {
        "id": "russian-classics-985",
        "label": "Father Sergius",
        "description": "Tolstoy, Leo, graf",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/985/985-0.txt"
      },
      {
        "id": "russian-classics-4761",
        "label": "The Cossacks: A Tale of 1852",
        "description": "Tolstoy, Leo, graf",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/4761.txt.utf-8"
      },
      {
        "id": "russian-classics-46272",
        "label": "The Journal of Leo Tolstoi (First Volume1895-1899)",
        "description": "Tolstoy, Leo, graf",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/46272.txt.utf-8"
      },
      {
        "id": "russian-classics-243",
        "label": "The forged coupon, and other stories",
        "description": "Tolstoy, Leo, graf",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/243.txt.utf-8"
      },
      {
        "id": "russian-classics-43794",
        "label": "My Religion",
        "description": "Tolstoy, Leo, graf",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/43794.txt.utf-8"
      },
      {
        "id": "russian-classics-43409",
        "label": "The Kingdom of God is Within You; What is Art?",
        "description": "Tolstoy, Leo, graf",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/43409.txt.utf-8"
      },
      {
        "id": "russian-classics-27726",
        "label": "Tolstoy on Shakespeare: A Critical Essay on Shakespeare",
        "description": "Tolstoy, Leo, graf",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/27726.txt.utf-8"
      },
      {
        "id": "russian-classics-49435",
        "label": "Tolstoy",
        "description": "Rolland, Romain",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/49435.txt.utf-8"
      },
      {
        "id": "russian-classics-47197",
        "label": "Sevastopol",
        "description": "Tolstoy, Leo, graf",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/47197.txt.utf-8"
      },
      {
        "id": "russian-classics-38027",
        "label": "Autobiography of Countess Tolstoy",
        "description": "Tolstaia, S. A. (Sofia Andreevna)",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/38027.txt.utf-8"
      },
      {
        "id": "russian-classics-2637",
        "label": "Youth",
        "description": "Tolstoy, Leo, graf",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/2637.txt.utf-8"
      },
      {
        "id": "russian-classics-38690",
        "label": "What Shall We Do?",
        "description": "Tolstoy, Leo, graf",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/38690.txt.utf-8"
      },
      {
        "id": "russian-classics-41119",
        "label": "A Russian Proprietor, and Other Stories",
        "description": "Tolstoy, Leo, graf",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/41119.txt.utf-8"
      },
      {
        "id": "russian-classics-62045",
        "label": "Leo Tolstoy",
        "description": "Chesterton, G. K. (Gilbert Keith)",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/62045.txt.utf-8"
      },
      {
        "id": "russian-classics-2450",
        "label": "Boyhood",
        "description": "Tolstoy, Leo, graf",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/2450/2450-0.txt"
      },
      {
        "id": "russian-classics-813",
        "label": "Reminiscences of Tolstoy, by His Son",
        "description": "Tolstoi, Ilia Lvovich, graf",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/813.txt.utf-8"
      },
      {
        "id": "russian-classics-4602",
        "label": "\"The Kingdom of God Is Within You\": Christianity Not as a Mystic Religion but as a New Theory of Life",
        "description": "Tolstoy, Leo, graf",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/4602.txt.utf-8"
      },
      {
        "id": "russian-classics-47353",
        "label": "Tolstoy",
        "description": "Winstanley, Lilian",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/47353.txt.utf-8"
      },
      {
        "id": "russian-classics-17352",
        "label": "The Awakening: (The Resurrection)",
        "description": "Tolstoy, Leo, graf",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/17352.txt.utf-8"
      },
      {
        "id": "russian-classics-26581",
        "label": "Master and Man",
        "description": "Tolstoy, Leo, graf",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/26581/26581_readme.txt"
      },
      {
        "id": "russian-classics-51708",
        "label": "Tolstoi for the young: Select tales from Tolstoi",
        "description": "Tolstoy, Leo, graf",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/51708.txt.utf-8"
      },
      {
        "id": "russian-classics-36111",
        "label": "Prophets of Dissent : Essays on Maeterlinck, Strindberg, Nietzsche and Tolstoy",
        "description": "Heller, Otto",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/36111.txt.utf-8"
      },
      {
        "id": "russian-classics-26661",
        "label": "The Power of Darkness",
        "description": "Tolstoy, Leo, graf",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/26661.txt.utf-8"
      },
      {
        "id": "russian-classics-67224",
        "label": "The Devil",
        "description": "Tolstoy, Leo, graf",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/67224.txt.utf-8"
      },
      {
        "id": "russian-classics-27189",
        "label": "\"Bethink Yourselves!\"",
        "description": "Tolstoy, Leo, graf",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/27189.txt.utf-8"
      },
      {
        "id": "russian-classics-9792",
        "label": "Redemption and two other plays",
        "description": "Tolstoy, Leo, graf",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/9792.txt.utf-8"
      },
      {
        "id": "russian-classics-43372",
        "label": "The Kingdom of God is Within You / Christianity and Patriotism / Miscellanies",
        "description": "Tolstoy, Leo, graf",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/43372.txt.utf-8"
      },
      {
        "id": "russian-classics-56797",
        "label": "The Invaders, and Other Stories",
        "description": "Tolstoy, Leo, graf",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/56797.txt.utf-8"
      },
      {
        "id": "russian-classics-31554",
        "label": "Lectures on Russian Literature: Pushkin, Gogol, Turgenef, Tolstoy",
        "description": "Panin, Ivan",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/31554.txt.utf-8"
      },
      {
        "id": "russian-classics-40260",
        "label": "The Last Days of Tolstoy",
        "description": "Chertkov, V. G. (Vladimir Grigorevich)",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/40260.txt.utf-8"
      },
      {
        "id": "russian-classics-26660",
        "label": "Plays: Complete Edition, Including the Posthumous Plays",
        "description": "Tolstoy, Leo, graf",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/26660.txt.utf-8"
      },
      {
        "id": "russian-classics-44266",
        "label": "Katia",
        "description": "Tolstoy, Leo, graf",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/44266.txt.utf-8"
      },
      {
        "id": "russian-classics-51018",
        "label": "Three Days in the Village, and Other Sketches.: Written from September 1909 to July 1910.",
        "description": "Tolstoy, Leo, graf",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/51018.txt.utf-8"
      },
      {
        "id": "russian-classics-61388",
        "label": "Sebastopol",
        "description": "Tolstoy, Leo, graf",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/61388.txt.utf-8"
      },
      {
        "id": "russian-classics-3630",
        "label": "What to Do? Thoughts Evoked by the Census of Moscow",
        "description": "Tolstoy, Leo, graf",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/3630.txt.utf-8"
      },
      {
        "id": "russian-classics-66544",
        "label": "Tolstoy's interpretation of money and property",
        "description": "Stanoyevich, Milivoy S. (Milivoy Stoyan)",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/66544.txt.utf-8"
      },
      {
        "id": "russian-classics-3631",
        "label": "On the Significance of Science and Art",
        "description": "Tolstoy, Leo, graf",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/3631.txt.utf-8"
      },
      {
        "id": "russian-classics-26663",
        "label": "Fruits of Culture",
        "description": "Tolstoy, Leo, graf",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/26663.txt.utf-8"
      },
      {
        "id": "russian-classics-26666",
        "label": "The Light Shines in Darkness",
        "description": "Tolstoy, Leo, graf",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/26666.txt.utf-8"
      },
      {
        "id": "russian-classics-3541",
        "label": "What to Do? Thoughts Evoked By the Census of Moscow",
        "description": "Tolstoy, Leo, graf",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/3541.txt.utf-8"
      },
      {
        "id": "russian-classics-26664",
        "label": "The Live Corpse",
        "description": "Tolstoy, Leo, graf",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/26664.txt.utf-8"
      },
      {
        "id": "russian-classics-3540",
        "label": "The Census in Moscow",
        "description": "Tolstoy, Leo, graf",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/3540.txt.utf-8"
      },
      {
        "id": "russian-classics-49203",
        "label": "\"My Visit to Tolstoy\": Five Discourses",
        "description": "Krauskopf, Joseph",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/49203.txt.utf-8"
      },
      {
        "id": "russian-classics-26472",
        "label": "What Men Live By and Other Tales",
        "description": "Tolstoy, Leo, graf",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/26472/26472-readme.txt"
      },
      {
        "id": "russian-classics-26662",
        "label": "The First Distiller",
        "description": "Tolstoy, Leo, graf",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/26662.txt.utf-8"
      },
      {
        "id": "russian-classics-26665",
        "label": "The Cause of it All",
        "description": "Tolstoy, Leo, graf",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/26665.txt.utf-8"
      },
      {
        "id": "russian-classics-10227",
        "label": "Tolstoy's Plower Story",
        "description": "Unknown",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/10227/10227-m/10227-m-readme.txt"
      },
      {
        "id": "russian-classics-1081",
        "label": "Dead Souls",
        "description": "Gogol, Nikolai Vasilevich",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/1081.txt.utf-8"
      },
      {
        "id": "russian-classics-3735",
        "label": "The Inspector-General",
        "description": "Gogol, Nikolai Vasilevich",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/3735.txt.utf-8"
      },
      {
        "id": "russian-classics-1197",
        "label": "Taras Bulba, and Other Tales",
        "description": "Gogol, Nikolai Vasilevich",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/1197/1197-0.txt"
      },
      {
        "id": "russian-classics-36238",
        "label": "The Mantle, and Other Stories",
        "description": "Gogol, Nikolai Vasilevich",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/36238.txt.utf-8"
      },
      {
        "id": "russian-classics-58409",
        "label": "Cossack Tales",
        "description": "Gogol, Nikolai Vasilevich",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/58409.txt.utf-8"
      },
      {
        "id": "russian-classics-58070",
        "label": "Home Life in Russia, Volumes 1 and 2: [Dead Souls]",
        "description": "Gogol, Nikolai Vasilevich",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/58070.txt.utf-8"
      },
      {
        "id": "russian-classics-25771",
        "label": "A Nobleman's Nest",
        "description": "Turgenev, Ivan Sergeevich",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/25771.txt.utf-8"
      },
      {
        "id": "russian-classics-8696",
        "label": "The Jew and Other Stories",
        "description": "Turgenev, Ivan Sergeevich",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/8696.txt.utf-8"
      },
      {
        "id": "russian-classics-9911",
        "label": "The Torrents of Spring",
        "description": "Turgenev, Ivan Sergeevich",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/9911.txt.utf-8"
      },
      {
        "id": "russian-classics-47935",
        "label": "Fathers and Sons",
        "description": "Turgenev, Ivan Sergeevich",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/47935.txt.utf-8"
      },
      {
        "id": "russian-classics-2466",
        "label": "Virgin Soil",
        "description": "Turgenev, Ivan Sergeevich",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/2466.txt.utf-8"
      },
      {
        "id": "russian-classics-30723",
        "label": "Fathers and Children",
        "description": "Turgenev, Ivan Sergeevich",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/30723.txt.utf-8"
      },
      {
        "id": "russian-classics-56878",
        "label": "First love, and other stories",
        "description": "Turgenev, Ivan Sergeevich",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/56878.txt.utf-8"
      },
      {
        "id": "russian-classics-8744",
        "label": "A Sportsman's Sketches, Volume 2: Works of Ivan Turgenev, Volume 2",
        "description": "Turgenev, Ivan Sergeevich",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/8744.txt.utf-8"
      },
      {
        "id": "russian-classics-8871",
        "label": "A Desperate Character and Other Stories",
        "description": "Turgenev, Ivan Sergeevich",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/8871.txt.utf-8"
      },
      {
        "id": "russian-classics-56678",
        "label": "Turgenev in English: A Checklist of Works by and about Him",
        "description": "Yachnin, Rissa",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/56678.txt.utf-8"
      },
      {
        "id": "russian-classics-15994",
        "label": "A Reckless Character, and Other Stories",
        "description": "Turgenev, Ivan Sergeevich",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/15994.txt.utf-8"
      },
      {
        "id": "russian-classics-8935",
        "label": "Dream Tales and Prose Poems",
        "description": "Turgenev, Ivan Sergeevich",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/8935.txt.utf-8"
      },
      {
        "id": "russian-classics-6902",
        "label": "On the eve: A novel",
        "description": "Turgenev, Ivan Sergeevich",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/6902.txt.utf-8"
      },
      {
        "id": "russian-classics-40813",
        "label": "Smoke",
        "description": "Turgenev, Ivan Sergeevich",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/40813.txt.utf-8"
      },
      {
        "id": "russian-classics-8597",
        "label": "A Sportsman's Sketches: Works of Ivan Turgenev, Volume I",
        "description": "Turgenev, Ivan Sergeevich",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/8597.txt.utf-8"
      },
      {
        "id": "russian-classics-6900",
        "label": "Rudin: A Novel",
        "description": "Turgenev, Ivan Sergeevich",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/6900.txt.utf-8"
      },
      {
        "id": "russian-classics-56809",
        "label": "Turgenev: A Study",
        "description": "Garnett, Edward",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/56809.txt.utf-8"
      },
      {
        "id": "russian-classics-52642",
        "label": "A Lear of the Steppes, etc.",
        "description": "Turgenev, Ivan Sergeevich",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/52642.txt.utf-8"
      },
      {
        "id": "russian-classics-41201",
        "label": "The diary of a superfluous man, and other stories",
        "description": "Turgenev, Ivan Sergeevich",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/41201.txt.utf-8"
      },
      {
        "id": "russian-classics-7120",
        "label": "Knock, Knock, Knock and Other Stories",
        "description": "Turgenev, Ivan Sergeevich",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/7120.txt.utf-8"
      },
      {
        "id": "russian-classics-5721",
        "label": "A House of Gentlefolk",
        "description": "Turgenev, Ivan Sergeevich",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/5721.txt.utf-8"
      },
      {
        "id": "russian-classics-9615",
        "label": "The diary of a superfluous man, and other stories",
        "description": "Turgenev, Ivan Sergeevich",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/9615.txt.utf-8"
      },
      {
        "id": "russian-classics-39427",
        "label": "Annouchka: A Tale",
        "description": "Turgenev, Ivan Sergeevich",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/39427.txt.utf-8"
      },
      {
        "id": "russian-classics-12194",
        "label": "Liza; Or, \"A Nest of Nobles\"",
        "description": "Turgenev, Ivan Sergeevich",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/12194.txt.utf-8"
      },
      {
        "id": "russian-classics-23056",
        "label": "The Rendezvous: 1907",
        "description": "Turgenev, Ivan Sergeevich",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/23056.txt.utf-8"
      },
      {
        "id": "russian-classics-57333",
        "label": "Project Gutenberg Compilation of Short Stories by Chekhov",
        "description": "Chekhov, Anton Pavlovich",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/57333.txt.utf-8"
      },
      {
        "id": "russian-classics-13415",
        "label": "The Lady with the Dog and Other Stories",
        "description": "Chekhov, Anton Pavlovich",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/13415.txt.utf-8"
      },
      {
        "id": "russian-classics-1754",
        "label": "The Sea-Gull",
        "description": "Chekhov, Anton Pavlovich",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/1754/1754-0.txt"
      },
      {
        "id": "russian-classics-13417",
        "label": "The Cook's Wedding and Other Stories",
        "description": "Chekhov, Anton Pavlovich",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/13417.txt.utf-8"
      },
      {
        "id": "russian-classics-7986",
        "label": "Plays by Anton Chekhov, Second Series",
        "description": "Chekhov, Anton Pavlovich",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/7986.txt.utf-8"
      },
      {
        "id": "russian-classics-1756",
        "label": "Uncle Vanya: Scenes from Country Life in Four Acts",
        "description": "Chekhov, Anton Pavlovich",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/1756.txt.utf-8"
      },
      {
        "id": "russian-classics-6408",
        "label": "Letters of Anton Chekhov to His Family and Friends",
        "description": "Chekhov, Anton Pavlovich",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/6408.txt.utf-8"
      },
      {
        "id": "russian-classics-55307",
        "label": "The Black Monk, and Other Stories",
        "description": "Chekhov, Anton Pavlovich",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/55307.txt.utf-8"
      },
      {
        "id": "russian-classics-1732",
        "label": "The schoolmistress, and other stories",
        "description": "Chekhov, Anton Pavlovich",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/1732.txt.utf-8"
      },
      {
        "id": "russian-classics-55283",
        "label": "The Bet, and other stories",
        "description": "Chekhov, Anton Pavlovich",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/55283.txt.utf-8"
      },
      {
        "id": "russian-classics-13414",
        "label": "Love, and Other Stories",
        "description": "Chekhov, Anton Pavlovich",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/13414.txt.utf-8"
      },
      {
        "id": "russian-classics-1883",
        "label": "The Wife, and Other Stories",
        "description": "Chekhov, Anton Pavlovich",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/1883/1883-0.txt"
      },
      {
        "id": "russian-classics-13416",
        "label": "The Darling and Other Stories",
        "description": "Chekhov, Anton Pavlovich",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/13416.txt.utf-8"
      },
      {
        "id": "russian-classics-13409",
        "label": "The Horse-Stealers and Other Stories",
        "description": "Chekhov, Anton Pavlovich",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/13409.txt.utf-8"
      },
      {
        "id": "russian-classics-13505",
        "label": "The Duel and Other Stories",
        "description": "Chekhov, Anton Pavlovich",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/13505.txt.utf-8"
      },
      {
        "id": "russian-classics-1944",
        "label": "The Witch, and Other Stories",
        "description": "Chekhov, Anton Pavlovich",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/1944/1944-0.txt"
      },
      {
        "id": "russian-classics-13413",
        "label": "The Party and Other Stories",
        "description": "Chekhov, Anton Pavlovich",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/13413.txt.utf-8"
      },
      {
        "id": "russian-classics-1753",
        "label": "Swan Song",
        "description": "Chekhov, Anton Pavlovich",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/1753/1753-0.txt"
      },
      {
        "id": "russian-classics-55351",
        "label": "The Three Sisters",
        "description": "Chekhov, Anton Pavlovich",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/55351/55351-0.txt"
      },
      {
        "id": "russian-classics-12494",
        "label": "Note-Book of Anton Chekhov",
        "description": "Chekhov, Anton Pavlovich",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/12494.txt.utf-8"
      },
      {
        "id": "russian-classics-13419",
        "label": "The Bishop and Other Stories",
        "description": "Chekhov, Anton Pavlovich",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/13419.txt.utf-8"
      },
      {
        "id": "russian-classics-1755",
        "label": "Ivanoff: A Play",
        "description": "Chekhov, Anton Pavlovich",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/1755.txt.utf-8"
      },
      {
        "id": "russian-classics-13412",
        "label": "The Schoolmaster and Other Stories",
        "description": "Chekhov, Anton Pavlovich",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/13412.txt.utf-8"
      },
      {
        "id": "russian-classics-66790",
        "label": "Russian Silhouettes: More Stories of Russian Life",
        "description": "Chekhov, Anton Pavlovich",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/66790.txt.utf-8"
      },
      {
        "id": "russian-classics-37129",
        "label": "Reminiscences of Anton Chekhov",
        "description": "Gorky, Maksim",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/37129.txt.utf-8"
      },
      {
        "id": "russian-classics-73729",
        "label": "The shooting party",
        "description": "Chekhov, Anton Pavlovich",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/73729.txt.utf-8"
      },
      {
        "id": "russian-classics-13418",
        "label": "The Chorus Girl and Other Stories",
        "description": "Chekhov, Anton Pavlovich",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/13418.txt.utf-8"
      },
      {
        "id": "russian-classics-56758",
        "label": "Anton Tchekhov, and Other Essays",
        "description": "Shestov, Lev",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/56758.txt.utf-8"
      },
      {
        "id": "russian-classics-27411",
        "label": "The House with the Mezzanine and Other Stories",
        "description": "Chekhov, Anton Pavlovich",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/27411.txt.utf-8"
      },
      {
        "id": "russian-classics-23055",
        "label": "The Slanderer: 1901",
        "description": "Chekhov, Anton Pavlovich",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/23055.txt.utf-8"
      },
      {
        "id": "russian-classics-23997",
        "label": "Eugene Oneguine [Onegin]: A Romance of Russian Life in Verse",
        "description": "Pushkin, Aleksandr Sergeevich",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/23997.txt.utf-8"
      },
      {
        "id": "russian-classics-55024",
        "label": "The Queen of Spades, and other stories",
        "description": "Pushkin, Aleksandr Sergeevich",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/55024.txt.utf-8"
      },
      {
        "id": "russian-classics-54991",
        "label": "Poems: With Introduction and Notes",
        "description": "Pushkin, Aleksandr Sergeevich",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/54991.txt.utf-8"
      },
      {
        "id": "russian-classics-5089",
        "label": "Boris Godunov: a drama in verse",
        "description": "Pushkin, Aleksandr Sergeevich",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/5089.txt.utf-8"
      },
      {
        "id": "russian-classics-55219",
        "label": "The Prose Tales of Alexander Pushkin",
        "description": "Pushkin, Aleksandr Sergeevich",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/55219.txt.utf-8"
      },
      {
        "id": "russian-classics-59194",
        "label": "Index of the Project Gutenberg Works of Alexander Pushkin",
        "description": "Pushkin, Aleksandr Sergeevich",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/59194.txt.utf-8"
      },
      {
        "id": "russian-classics-13511",
        "label": "The Daughter of the Commandant",
        "description": "Pushkin, Aleksandr Sergeevich",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/13511.txt.utf-8"
      },
      {
        "id": "russian-classics-4344",
        "label": "Marie; a story of Russian love",
        "description": "Pushkin, Aleksandr Sergeevich",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/4344.txt.utf-8"
      },
      {
        "id": "russian-classics-23058",
        "label": "The Queen Of Spades",
        "description": "Pushkin, Aleksandr Sergeevich",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/23058.txt.utf-8"
      },
      {
        "id": "russian-classics-12458",
        "label": "The Talisman, from the Russian of Alexander Pushkin; With Other Pieces",
        "description": "Borrow, George",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/12458.txt.utf-8"
      },
      {
        "id": "russian-classics-58272",
        "label": "Index of the Project Gutenberg Works of Aleksandr Pushkin",
        "description": "Pushkin, Aleksandr Sergeevich",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/58272.txt.utf-8"
      }
    ]
  },
  {
    "id": "socialist-literature",
    "label": "Socialist & Communist",
    "description": "Political essays and utopian classics.",
    "samples": [
      {
        "id": "communist-manifesto",
        "label": "The Communist Manifesto",
        "description": "Karl Marx & Friedrich Engels",
        "url": "samples/communist-manifesto.txt"
      },
      {
        "id": "conquest-of-bread",
        "label": "The Conquest of Bread",
        "description": "Peter Kropotkin",
        "url": "samples/conquest-of-bread.txt"
      },
      {
        "id": "state-and-revolution",
        "label": "The State and Revolution",
        "description": "Vladimir Lenin",
        "url": "samples/state-and-revolution.txt"
      },
      {
        "id": "looking-backward",
        "label": "Looking Backward",
        "description": "Edward Bellamy",
        "url": "samples/looking-backward.txt"
      },
      {
        "id": "utopian-and-scientific",
        "label": "Socialism: Utopian and Scientific",
        "description": "Friedrich Engels",
        "url": "samples/utopian-and-scientific.txt"
      },
      {
        "id": "working-class-england",
        "label": "The Condition of the Working Class in England",
        "description": "Friedrich Engels",
        "url": "samples/working-class-england.txt"
      },
      {
        "id": "soul-of-man-under-socialism",
        "label": "The Soul of Man Under Socialism",
        "description": "Oscar Wilde",
        "url": "samples/soul-of-man-under-socialism.txt"
      },
      {
        "id": "letter-to-american-workingmen",
        "label": "A Letter to American Workingmen",
        "description": "Vladimir Lenin",
        "url": "samples/letter-to-american-workingmen.txt"
      }
    ]
  },
  {
    "id": "victorian-social",
    "label": "Victorian Social Novels",
    "description": "Industrial Britain and social reform classics.",
    "samples": [
      {
        "id": "victorian-hard-times",
        "label": "Hard Times",
        "description": "Charles Dickens",
        "url": "samples/hard-times.txt"
      },
      {
        "id": "victorian-north-south",
        "label": "North and South",
        "description": "Elizabeth Gaskell",
        "url": "samples/north-and-south.txt"
      }
    ]
  },
  {
    "id": "gothic-romantic",
    "label": "Gothic & Romantic",
    "description": "Dark, atmospheric tales and romantic classics.",
    "samples": [
      {
        "id": "gothic-frankenstein",
        "label": "Frankenstein",
        "description": "Mary Shelley",
        "url": "samples/frankenstein.txt"
      },
      {
        "id": "gothic-dracula",
        "label": "Dracula",
        "description": "Bram Stoker",
        "url": "samples/dracula.txt"
      }
    ]
  },
  {
    "id": "french-classics",
    "label": "French Classics",
    "description": "Epic French novels and literary pillars.",
    "samples": [
      {
        "id": "french-les-miserables",
        "label": "Les Miserables",
        "description": "Victor Hugo",
        "url": "samples/les-miserables.txt"
      },
      {
        "id": "french-monte-cristo",
        "label": "The Count of Monte Cristo",
        "description": "Alexandre Dumas",
        "url": "samples/count-of-monte-cristo.txt"
      }
    ]
  },
  {
    "id": "ancient-classics",
    "label": "Ancient Classics",
    "description": "Foundational epics from the ancient world.",
    "samples": [
      {
        "id": "ancient-iliad",
        "label": "The Iliad",
        "description": "Homer",
        "url": "samples/iliad.txt"
      },
      {
        "id": "ancient-odyssey",
        "label": "The Odyssey",
        "description": "Homer",
        "url": "samples/odyssey.txt"
      }
    ]
  },
  {
    "id": "philosophy-essays",
    "label": "Philosophy & Essays",
    "description": "Timeless reflections and political thought.",
    "samples": [
      {
        "id": "philosophy-meditations",
        "label": "Meditations",
        "description": "Marcus Aurelius",
        "url": "samples/meditations.txt"
      },
      {
        "id": "philosophy-on-liberty",
        "label": "On Liberty",
        "description": "John Stuart Mill",
        "url": "samples/on-liberty.txt"
      }
    ]
  },
  {
    "id": "sci-fi-speculative",
    "label": "Sci-Fi & Speculative",
    "description": "Classic visions of science and the future.",
    "samples": [
      {
        "id": "sci-fi-time-machine",
        "label": "The Time Machine",
        "description": "H. G. Wells",
        "url": "samples/time-machine.txt"
      },
      {
        "id": "sci-fi-war-of-worlds",
        "label": "The War of the Worlds",
        "description": "H. G. Wells",
        "url": "samples/war-of-worlds.txt"
      }
    ]
  },
  {
    "id": "adventure-sea",
    "label": "Adventure & Sea Tales",
    "description": "Voyages, treasure hunts, and life at sea.",
    "samples": [
      {
        "id": "adventure-treasure-island",
        "label": "Treasure Island",
        "description": "Robert Louis Stevenson",
        "url": "samples/treasure-island.txt"
      },
      {
        "id": "adventure-moby-dick",
        "label": "Moby-Dick",
        "description": "Herman Melville",
        "url": "samples/moby-dick.txt"
      },
      {
        "id": "adventure-sea-11",
        "label": "Alice's Adventures in Wonderland",
        "description": "Carroll, Lewis",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/11.txt.utf-8"
      },
      {
        "id": "adventure-sea-6761",
        "label": "The Adventures of Ferdinand Count Fathom Complete",
        "description": "Smollett, T. (Tobias)",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/6761.txt.utf-8"
      },
      {
        "id": "adventure-sea-4085",
        "label": "The Adventures of Roderick Random",
        "description": "Smollett, T. (Tobias)",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/4085.txt.utf-8"
      },
      {
        "id": "adventure-sea-76",
        "label": "Adventures of Huckleberry Finn",
        "description": "Twain, Mark",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/76.txt.utf-8"
      },
      {
        "id": "adventure-sea-1661",
        "label": "The Adventures of Sherlock Holmes",
        "description": "Doyle, Arthur Conan",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/1661.txt.utf-8"
      },
      {
        "id": "adventure-sea-74",
        "label": "The Adventures of Tom Sawyer, Complete",
        "description": "Twain, Mark",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/74.txt.utf-8"
      },
      {
        "id": "adventure-sea-521",
        "label": "The Life and Adventures of Robinson Crusoe",
        "description": "Defoe, Daniel",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/521.txt.utf-8"
      },
      {
        "id": "adventure-sea-21760",
        "label": "The Wonder Island Boys: Adventures on Strange Islands",
        "description": "Finlay, Roger T. (Roger Thompson)",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/21760.txt.utf-8"
      },
      {
        "id": "adventure-sea-6133",
        "label": "The Extraordinary Adventures of Arsene Lupin, Gentleman-Burglar",
        "description": "Leblanc, Maurice",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/6133.txt.utf-8"
      },
      {
        "id": "adventure-sea-19033",
        "label": "Alice's Adventures in Wonderland",
        "description": "Carroll, Lewis",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/19033.txt.utf-8"
      },
      {
        "id": "adventure-sea-500",
        "label": "The Adventures of Pinocchio",
        "description": "Collodi, Carlo",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/500/500-0.txt"
      },
      {
        "id": "adventure-sea-10148",
        "label": "The Merry Adventures of Robin Hood",
        "description": "Pyle, Howard",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/10148.txt.utf-8"
      },
      {
        "id": "adventure-sea-48320",
        "label": "Adventures of Sherlock Holmes: Illustrated",
        "description": "Doyle, Arthur Conan",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/48320.txt.utf-8"
      },
      {
        "id": "adventure-sea-45033",
        "label": "The Sea: Its Stirring Story of Adventure, Peril, & Heroism. Volume 4",
        "description": "Whymper, Frederick",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/45033.txt.utf-8"
      },
      {
        "id": "adventure-sea-7326",
        "label": "The Yeoman Adventurer",
        "description": "Gough, George W.",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/7326.txt.utf-8"
      },
      {
        "id": "adventure-sea-38983",
        "label": "The Camp Fire Girls Solve a Mystery; Or, The Christmas Adventure at Carver House",
        "description": "Frey, Hildegard G.",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/38983.txt.utf-8"
      },
      {
        "id": "adventure-sea-39341",
        "label": "The Sea: Its Stirring Story of Adventure, Peril, & Heroism. Volume 1",
        "description": "Whymper, Frederick",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/39341.txt.utf-8"
      },
      {
        "id": "adventure-sea-35749",
        "label": "The Adventures of Fleet Foot and Her Fawns: A True-to-Nature Story for Children and Their Elders",
        "description": "Chaffee, Allen",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/35749.txt.utf-8"
      },
      {
        "id": "adventure-sea-520",
        "label": "The Life and Adventures of Santa Claus",
        "description": "Baum, L. Frank (Lyman Frank)",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/520.txt.utf-8"
      },
      {
        "id": "adventure-sea-19640",
        "label": "Adventures of Huckleberry Finn",
        "description": "Twain, Mark",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/19640/19640.txt"
      },
      {
        "id": "adventure-sea-19516",
        "label": "The Adventures of Pinocchio",
        "description": "Collodi, Carlo",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/19516/19516.txt"
      },
      {
        "id": "adventure-sea-35688",
        "label": "Alice in Wonderland: A Dramatization of Lewis Carroll's \"Alice's Adventures in Wonderland\" and \"Through the Looking Glass\"",
        "description": "Carroll, Lewis",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/35688.txt.utf-8"
      },
      {
        "id": "adventure-sea-56347",
        "label": "The General Historie of Virginia, New England & the Summer Isles (Vol. I): Together with the True Travels, Adventures and Observations, and a Sea Grammar",
        "description": "Smith, John",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/56347.txt.utf-8"
      },
      {
        "id": "adventure-sea-31395",
        "label": "Railway Adventures and Anecdotes: Extending over More Than Fifty Years",
        "description": "Unknown",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/31395.txt.utf-8"
      },
      {
        "id": "adventure-sea-55822",
        "label": "Argonauts of the Western Pacific: An Account of Native Enterprise and Adventure in the Archipelagoes of Melanesian New Guinea",
        "description": "Malinowski, Bronislaw",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/55822.txt.utf-8"
      },
      {
        "id": "adventure-sea-19573",
        "label": "Alice's Adventures in Wonderland",
        "description": "Carroll, Lewis",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/19573/19573.txt"
      },
      {
        "id": "adventure-sea-28152",
        "label": "Sword and Pen: Ventures and Adventures of Willard Glazier",
        "description": "Owens, John Algernon",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/28152.txt.utf-8"
      },
      {
        "id": "adventure-sea-18304",
        "label": "American Adventures: A Second Trip 'Abroad at home'",
        "description": "Street, Julian",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/18304.txt.utf-8"
      },
      {
        "id": "adventure-sea-39342",
        "label": "The Sea: Its Stirring Story of Adventure, Peril, & Heroism. Volume 2",
        "description": "Whymper, Frederick",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/39342.txt.utf-8"
      },
      {
        "id": "adventure-sea-33823",
        "label": "The Gay Adventure: A Romance",
        "description": "Bird, Richard",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/33823.txt.utf-8"
      },
      {
        "id": "adventure-sea-2400",
        "label": "Vikram and the Vampire: Classic Hindu Tales of Adventure, Magic, and Romance",
        "description": "Burton, Richard Francis, Sir",
        "url": "https://r.jina.ai/http://www.gutenberg.org/files/2400/2400-0.txt"
      },
      {
        "id": "adventure-sea-28885",
        "label": "Alice's Adventures in Wonderland: Illustrated by Arthur Rackham. With a Proem by Austin Dobson",
        "description": "Carroll, Lewis",
        "url": "https://r.jina.ai/http://www.gutenberg.org/ebooks/28885.txt.utf-8"
      }
    ]
  },
  {
    "id": "poetry-collections",
    "label": "Poetry Collections",
    "description": "Landmark poetry volumes and anthologies.",
    "samples": [
      {
        "id": "poetry-leaves-of-grass",
        "label": "Leaves of Grass",
        "description": "Walt Whitman",
        "url": "samples/leaves-of-grass.txt"
      },
      {
        "id": "poetry-emily-dickinson",
        "label": "Poems of Emily Dickinson",
        "description": "Emily Dickinson",
        "url": "samples/emily-dickinson-poems.txt"
      }
    ]
  },
  {
    "id": "plays-drama",
    "label": "Plays & Drama",
    "description": "Stage classics and dramatic works.",
    "samples": [
      {
        "id": "plays-hamlet",
        "label": "Hamlet",
        "description": "William Shakespeare",
        "url": "samples/hamlet.txt"
      },
      {
        "id": "plays-importance-earnest",
        "label": "The Importance of Being Earnest",
        "description": "Oscar Wilde",
        "url": "samples/importance-of-being-earnest.txt"
      }
    ]
  }
];

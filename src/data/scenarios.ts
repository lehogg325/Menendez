import type { Scenario } from '../types/game'

export const scenarios: Scenario[] = [
  // -------------------------------------------------------------------------
  // Phase 1: The Corruption — accepting bribes, building the network (1–7)
  // -------------------------------------------------------------------------
  {
    round: 1,
    title: 'The Envelope Problem',
    description:
      'A generous Egyptian-American businessman named Wael Hana drops off a manila envelope at your Senate office. Your aide reports it\'s "very heavy." Your wife Nadine is on the phone asking if it arrived.',
    options: [
      {
        text: 'Count every gold bar and stash them in the bedroom closet',
        fbi: 18,
        foreign: 12,
        cash: 20,
        flavor: 'Thirteen bars. You count them twice. Nadine suggests labeling them "good boy gold."',
      },
      {
        text: 'Accept delivery but have your aide log it as "campaign materials"',
        fbi: 10,
        foreign: 8,
        cash: 15,
        flavor: 'Very heavy campaign materials. The FEC will never know the difference. Probably.',
      },
      {
        text: 'Forward the envelope to a staffer and plausibly deny ever seeing it',
        fbi: 4,
        foreign: 5,
        cash: 6,
        flavor: 'The staffer now has the gold. He also has questions. You have no answers.',
      },
      {
        text: 'Politely decline and report the contact to the Senate ethics office',
        fbi: -5,
        foreign: -5,
        cash: 0,
        flavor: 'Your ethics report is filed. Wael Hana stops returning your calls. Nadine is furious.',
      },
    ],
  },
  {
    round: 2,
    title: 'The Halal Monopoly',
    description:
      'Wael Hana\'s halal food company is seeking exclusive import rights into Egypt. He\'d like you to make a few calls to USDA contacts on his behalf. He mentions a forthcoming "consulting arrangement" with your wife.',
    options: [
      {
        text: 'Call USDA, Treasury, and throw in a Commerce contact for good measure',
        fbi: 20,
        foreign: 18,
        cash: 18,
        flavor: 'You spend 40 minutes on the phone. Wael calls it "the most productive morning of his life."',
      },
      {
        text: 'Write a formal letter on Senate letterhead praising the company',
        fbi: 14,
        foreign: 12,
        cash: 12,
        flavor: 'Beautifully written. Your press secretary quietly removes it from the website three months later.',
      },
      {
        text: 'Have a staffer make the call and keep your fingerprints off it',
        fbi: 7,
        foreign: 8,
        cash: 8,
        flavor: 'Clean hands. The staffer\'s hands are less clean. His career is shorter.',
      },
      {
        text: 'Wish him luck but decline to intervene with federal agencies',
        fbi: -4,
        foreign: -8,
        cash: 0,
        flavor: 'Wael says he understands. He does not understand. The consulting arrangement evaporates.',
      },
    ],
  },
  {
    round: 3,
    title: 'The Luxury Mercedes',
    description:
      'A gleaming white Mercedes-Benz convertible has appeared in your driveway. You didn\'t buy it. Nadine says it was a "birthday surprise" from a friend. The friend is a federal contractor.',
    options: [
      {
        text: 'Keep the car. It\'s already in the driveway. Possession is nine-tenths.',
        fbi: 19,
        foreign: 5,
        cash: 16,
        flavor: 'You drive it to a constituent meeting in Hoboken. A photographer is there. Of course.',
      },
      {
        text: 'Transfer the title to a family member and call it a gift to them',
        fbi: 13,
        foreign: 3,
        cash: 12,
        flavor: 'Your nephew is thrilled. Your nephew is also now a person of interest.',
      },
      {
        text: 'Have your lawyer draft paperwork establishing it as a loan',
        fbi: 7,
        foreign: 2,
        cash: 7,
        flavor: 'A loan with no repayment schedule or interest. Legally a gift. But the paperwork looks nice.',
      },
      {
        text: 'Return the car and demand to know who put it there',
        fbi: -5,
        foreign: -3,
        cash: 0,
        flavor: 'Admirable. The contractor sends flowers instead. Flowers are fine.',
      },
    ],
  },
  {
    round: 4,
    title: 'The Nadine Problem',
    description:
      'A New Jersey developer wants federal permitting expedited. Rather than approach you directly, he\'s offered your wife Nadine a six-figure "real estate consulting contract." Nadine is asking if you can make a few calls. The contract is contingent on results.',
    options: [
      {
        text: 'Make the calls — it\'s Nadine\'s contract, not yours',
        fbi: 17,
        foreign: 0,
        cash: 18,
        flavor: '"Senator Menendez is personally interested in this project." Permit issued in 48 hours. Nadine\'s contract is funded.',
      },
      {
        text: 'Write a letter on Senate stationery and give it to Nadine to deliver',
        fbi: 11,
        foreign: 0,
        cash: 12,
        flavor: 'The letter is filed in the permit application. Also in the FBI evidence locker.',
      },
      {
        text: 'Have a local party official make the call while you stay at arm\'s length',
        fbi: 6,
        foreign: 0,
        cash: 9,
        flavor: 'Three degrees of separation. You feel clean. Nadine feels impatient.',
      },
      {
        text: 'Tell Nadine she cannot take the contract — conflict is obvious',
        fbi: -3,
        foreign: 0,
        cash: 0,
        flavor: 'Nadine cancels the contract. The developer is cold. Your marriage is colder.',
      },
    ],
  },
  {
    round: 5,
    title: 'The Egyptian Intel Request',
    description:
      'Your Egyptian government contact asks you to share non-public information about a confidential U.S. personnel matter at the Cairo embassy. He says it\'s "just to smooth things over." Your phone is buzzing.',
    options: [
      {
        text: 'Email him the full classified summary — nothing says friendship like classified documents',
        fbi: 25,
        foreign: 22,
        cash: 5,
        flavor: 'He thanks you profusely. The NSA also thanks you, in a different sense of the word.',
      },
      {
        text: 'Share it verbally over lunch, nothing written down',
        fbi: 18,
        foreign: 18,
        cash: 4,
        flavor: 'A perfectly deniable lunch. The restaurant has cameras. Small detail.',
      },
      {
        text: 'Tell him what you can find from public sources and leave it vague',
        fbi: 6,
        foreign: 6,
        cash: 2,
        flavor: '"He works at the embassy" is technically public information. Probably fine.',
      },
      {
        text: 'Ignore the request and stop taking his calls for a week',
        fbi: -3,
        foreign: -10,
        cash: 0,
        flavor: 'A week of silence. Then a fruit basket arrives. You eat the fruit. You have regrets.',
      },
    ],
  },
  {
    round: 6,
    title: 'The Wire Transfer Question',
    description:
      'A suspicious wire transfer from a Qatari account has been flagged by your bank compliance officer. It\'s routed through three shell companies and landed in a PAC adjacent to your campaign. The banker wants clarification.',
    options: [
      {
        text: 'Tell the banker to mark it "reviewed" and stop asking questions',
        fbi: 22,
        foreign: 15,
        cash: 20,
        flavor: 'He marks it reviewed. He also marks you in his personal notes as "a problem."',
      },
      {
        text: 'Have the PAC treasurer draft a retroactive explanation memo',
        fbi: 14,
        foreign: 10,
        cash: 15,
        flavor: 'The memo explains everything except where the money came from.',
      },
      {
        text: 'Delay responding until the quarterly compliance window closes',
        fbi: 8,
        foreign: 6,
        cash: 10,
        flavor: 'Technically compliant. Your bank compliance officer is technically looking for another job.',
      },
      {
        text: 'Unwind the transfer and file a SAR with FinCEN',
        fbi: -6,
        foreign: -12,
        cash: -10,
        flavor: 'The right call. The Qatari contact never writes again. You sleep moderately well.',
      },
    ],
  },
  {
    round: 7,
    title: 'The Re-election War Chest',
    description:
      'Your campaign account needs $4 million in the next quarter. A bundler with close ties to a foreign sovereign wealth fund is offering to organize a fundraiser. The guest list is interesting.',
    options: [
      {
        text: 'Accept the fundraiser, no questions asked about the guest list',
        fbi: 20,
        foreign: 20,
        cash: 22,
        flavor: 'A tremendous evening. The FARA unit has questions about three attendees.',
      },
      {
        text: 'Accept the fundraiser but vet the guest list for foreign nationals',
        fbi: 10,
        foreign: 10,
        cash: 15,
        flavor: 'You vet seven names. The eighth name was the important one.',
      },
      {
        text: 'Decline the bundler but keep him as a personal contact',
        fbi: 4,
        foreign: 4,
        cash: 5,
        flavor: 'He understands. He sends a congratulatory note when you win. You win.',
      },
      {
        text: 'Report the solicitation to the FEC as a potential violation',
        fbi: -8,
        foreign: -14,
        cash: 0,
        flavor: 'The FEC says thank you. Your campaign is $4M short. The primary is in six weeks.',
      },
    ],
  },

  // -------------------------------------------------------------------------
  // Phase 2: Congressional abuse — weaponizing the chairmanship (8–11)
  // -------------------------------------------------------------------------
  {
    round: 8,
    title: 'The Senate Committee Vote',
    description:
      'Egypt\'s foreign aid package is up for a vote on the Senate Foreign Relations Committee — which you chair. Your Egyptian contacts are watching. A $50K "gift" arrived yesterday.',
    options: [
      {
        text: 'Push the full package through without amendments, personally',
        fbi: 20,
        foreign: 20,
        cash: 15,
        flavor: 'The vote is 8-4. Egypt gets the aid. Wael texts you a champagne emoji.',
      },
      {
        text: 'Greenlight it but attach a minor human rights amendment for cover',
        fbi: 10,
        foreign: 12,
        cash: 12,
        flavor: 'Egypt rejects the amendment in committee. Package passes. You tried, technically.',
      },
      {
        text: 'Abstain and let the vote proceed without your influence',
        fbi: 3,
        foreign: 2,
        cash: 5,
        flavor: 'A profile in cowardice, not courage. But legally defensible cowardice.',
      },
      {
        text: 'Block the package and return the gift',
        fbi: -8,
        foreign: -15,
        cash: -5,
        flavor: 'You are briefly celebrated as a statesman. Wael stops calling entirely.',
      },
    ],
  },
  {
    round: 9,
    title: 'The Chairman\'s Dilemma',
    description:
      'As Chairman of the Senate Foreign Relations Committee, you control which nominations advance. Egypt\'s preferred ambassador nominee is sitting on your desk. So is a letter from 38 human rights organizations asking you to hold the nomination. Cairo is watching.',
    options: [
      {
        text: 'Fast-track the nomination — schedule a same-week confirmation hearing',
        fbi: 8,
        foreign: 18,
        cash: 15,
        flavor: 'The nomination clears in four days. Cairo sends a fruit basket. The NGO letter is filed under "received."',
      },
      {
        text: 'Hold a perfunctory hearing and advance it on a party-line vote',
        fbi: 5,
        foreign: 12,
        cash: 10,
        flavor: 'Due process was technically observed. The NGOs are not impressed by technicalities.',
      },
      {
        text: 'Delay indefinitely — schedule no hearing and return no calls from Cairo',
        fbi: 3,
        foreign: -5,
        cash: 0,
        flavor: 'The nomination sits in limbo. Cairo stops sending fruit baskets. You keep the last one.',
      },
      {
        text: 'Refer the nomination to a subcommittee and let it die quietly',
        fbi: -5,
        foreign: -12,
        cash: 0,
        flavor: 'The nomination expires without a vote. Cairo goes silent. The NGOs send a thank-you card.',
      },
    ],
  },
  {
    round: 10,
    title: 'The Menendez Doctrine',
    description:
      'Egypt has requested that you publicly oppose a congressional resolution criticizing their human rights record. Your Egyptian contact says this is "very important to the relationship." You have a floor speech scheduled.',
    options: [
      {
        text: 'Give a floor speech opposing the resolution and praising Egypt\'s "reform progress"',
        fbi: 15,
        foreign: 25,
        cash: 12,
        flavor: 'Amnesty International issues a statement. Your contact sends another fruit basket.',
      },
      {
        text: 'Simply decline to vote, citing a scheduling conflict',
        fbi: 6,
        foreign: 10,
        cash: 8,
        flavor: 'You were at a fundraiser during the vote. This is documented.',
      },
      {
        text: 'Vote for the resolution but quietly signal it was procedural',
        fbi: 3,
        foreign: 5,
        cash: 3,
        flavor: 'Your contact is confused. You shrug diplomatically. The shrug costs you a fruit basket.',
      },
      {
        text: 'Vote for the resolution and give a statement supporting press freedom in Egypt',
        fbi: -7,
        foreign: -18,
        cash: 0,
        flavor: 'Genuine statesmanship. It feels strange. Wael Hana calls you a "disappointment."',
      },
    ],
  },
  {
    round: 11,
    title: 'The Prosecutor Problem',
    description:
      'The U.S. Attorney\'s office in New Jersey has been asking pointed questions about a contractor who donated to your campaign. You happen to know the sitting U.S. Attorney personally — he\'s been angling for a state judgeship that requires your recommendation.',
    options: [
      {
        text: 'Quietly signal the judgeship depends on how aggressively he pursues the case',
        fbi: 12,
        foreign: 0,
        cash: 5,
        flavor: 'He gets the message. He also writes it down. You will regret this.',
      },
      {
        text: 'Have a mutual contact suggest a friendly meeting "off the record"',
        fbi: 8,
        foreign: 0,
        cash: 8,
        flavor: 'The meeting happens. So does a memo documenting it.',
      },
      {
        text: 'Issue a statement praising his record and let him draw his own conclusions',
        fbi: 3,
        foreign: 0,
        cash: 2,
        flavor: 'Oblique. Deniable. He reads it twice. You\'re not sure he got the point.',
      },
      {
        text: 'Say nothing and let the investigation proceed independently',
        fbi: -5,
        foreign: 0,
        cash: 0,
        flavor: 'The investigation proceeds. You sleep marginally better for not interfering.',
      },
    ],
  },

  // -------------------------------------------------------------------------
  // Phase 3: The investigation closes in (12–15)
  // -------------------------------------------------------------------------
  {
    round: 12,
    title: 'The FBI Knock',
    description:
      'Two FBI agents are at your front door at 7 AM on a Tuesday. They\'re "just asking questions." Your lawyer is not here. Your robe is.',
    options: [
      {
        text: 'Invite them in, offer coffee, and start answering questions immediately',
        fbi: 25,
        foreign: 3,
        cash: 0,
        flavor: '"So about those jackets..." The coffee is good. The debrief is not.',
      },
      {
        text: 'Speak to them briefly, deny everything, and close the door',
        fbi: 18,
        foreign: 2,
        cash: 0,
        flavor: 'You denied five things in thirty seconds. Four of them are provably false.',
      },
      {
        text: 'Tell them to contact your attorney and close the door politely',
        fbi: 4,
        foreign: 1,
        cash: 0,
        flavor: 'Your attorney answers on the first ring. He was expecting this call.',
      },
      {
        text: 'Refuse to answer the door and text your lawyer from the bathroom',
        fbi: 8,
        foreign: 0,
        cash: 0,
        flavor: 'They wait outside for 40 minutes. You text very fast for a man in a robe.',
      },
    ],
  },
  {
    round: 13,
    title: 'Cash in the Jacket',
    description:
      'FBI agents have found $480,000 in cash stuffed inside jacket pockets and envelopes in your New Jersey home during a search. You need a press conference statement. America is watching.',
    options: [
      {
        text: 'Claim it\'s a family tradition — your family doesn\'t trust banks',
        fbi: 15,
        foreign: 2,
        cash: 10,
        flavor: '"My family has always kept cash in jackets." No one believes this. You say it again, louder.',
      },
      {
        text: 'Blame your wife and say you had no knowledge of the funds',
        fbi: 10,
        foreign: 2,
        cash: 8,
        flavor: 'Nadine watches the press conference. Your couch is now your bed.',
      },
      {
        text: 'Invoke your Cuban immigrant experience and pivot to a story about freedom',
        fbi: 8,
        foreign: 1,
        cash: 5,
        flavor: 'It\'s a moving speech. CNN replays the jacket footage immediately afterward.',
      },
      {
        text: 'Lawyer up, say nothing, and let your attorney handle all questions',
        fbi: 2,
        foreign: 0,
        cash: 2,
        flavor: 'Textbook crisis management. Your lawyer bills $800/hour. Worth every penny.',
      },
    ],
  },
  {
    round: 14,
    title: 'The Gold Bar Appraisal',
    description:
      'A financial journalist is asking questions about gold bars found in your home during the search. Specifically, she\'s found serial numbers matching bars stolen in a 2013 robbery. She wants a comment.',
    options: [
      {
        text: 'Claim the bars are an heirloom from a deceased relative in Cuba',
        fbi: 16,
        foreign: 2,
        cash: 8,
        flavor: 'Your family has no documented relatives from Cuba who dealt in gold bars. Minor detail.',
      },
      {
        text: 'Deny owning any gold bars while gold bars are visible in your home',
        fbi: 22,
        foreign: 2,
        cash: 5,
        flavor: '"Those are decorative." The serial numbers are not decorative.',
      },
      {
        text: 'Issue a statement saying the matter is under legal review',
        fbi: 6,
        foreign: 1,
        cash: 3,
        flavor: '"Under legal review" is Washington for "yes but we\'re not saying yes."',
      },
      {
        text: 'Cooperate with the journalist and provide provenance documentation',
        fbi: -4,
        foreign: 0,
        cash: -3,
        flavor: 'The provenance documentation raises more questions. But it\'s the right thing to do.',
      },
    ],
  },
  {
    round: 15,
    title: 'The Indictment Leak',
    description:
      'A source inside DOJ tips you that a sealed indictment may be coming within 60 days. You have time to prepare. Or to do something inadvisable. Or both.',
    options: [
      {
        text: 'Shred documents, move assets, and coach your associates on testimony',
        fbi: 30,
        foreign: 5,
        cash: 5,
        flavor: 'Obstruction of justice is technically worse than the original crimes. You learn this.',
      },
      {
        text: 'Quietly move cash into offshore accounts through a friendly attorney',
        fbi: 20,
        foreign: 8,
        cash: 18,
        flavor: 'The attorney bills $400K. The accounts are discovered anyway. Great investment.',
      },
      {
        text: 'Hold a preemptive press conference calling the investigation politically motivated',
        fbi: 10,
        foreign: 2,
        cash: 2,
        flavor: 'Fox News and MSNBC both cover it. CNN does a chyron: "Senator Defiant." You like that one.',
      },
      {
        text: 'Hire a top criminal defense attorney and say absolutely nothing publicly',
        fbi: 2,
        foreign: 0,
        cash: -5,
        flavor: 'The attorney says this was the correct choice. He charges $900/hour to say it.',
      },
    ],
  },

  // -------------------------------------------------------------------------
  // Phase 4: Pre-trial scramble (16–17)
  // -------------------------------------------------------------------------
  {
    round: 16,
    title: 'The Weight of Gold',
    description:
      'You need to move $150K in gold bars quickly. Your current situation has made the usual methods complicated. A pawn shop in Secaucus asks no questions. Neither does a coin dealer in Parsippany.',
    options: [
      {
        text: 'Pawn shop. Cash. No paperwork.',
        fbi: 24,
        foreign: 0,
        cash: 20,
        flavor: 'The pawnbroker gives you $112K for $150K in gold. You take it. He takes photos.',
      },
      {
        text: 'Coin dealer with a loose interpretation of reporting requirements',
        fbi: 16,
        foreign: 0,
        cash: 18,
        flavor: 'The CTR is filed. Incorrectly. The IRS notices. Eventually.',
      },
      {
        text: 'Store them with a trusted friend for now and deal with it after the election',
        fbi: 8,
        foreign: 0,
        cash: 5,
        flavor: 'Your trusted friend is now in possession of stolen gold bars. He is less trusted by the end of the month.',
      },
      {
        text: 'Have an attorney hold the gold as evidence and cooperate with investigators',
        fbi: -10,
        foreign: 0,
        cash: -15,
        flavor: 'The correct move. Painful. Your attorney charges storage fees.',
      },
    ],
  },
  {
    round: 17,
    title: 'The Cooperating Witness',
    description:
      'One of your associates has flipped and is cooperating with federal prosecutors. He knows about three separate incidents. You know he knows. He knows you know he knows.',
    options: [
      {
        text: 'Reach out through intermediaries to "remind him of your friendship"',
        fbi: 28,
        foreign: 2,
        cash: 0,
        flavor: 'Witness tampering is added to the list. The list is getting long.',
      },
      {
        text: 'Have your lawyer explore whether his deal can be challenged on procedural grounds',
        fbi: 10,
        foreign: 1,
        cash: -8,
        flavor: 'The procedural challenge fails. Your lawyer submits his invoice on the way out.',
      },
      {
        text: 'Begin preparing your own counter-narrative and document everything',
        fbi: 5,
        foreign: 0,
        cash: -4,
        flavor: 'Counter-narratives require facts. You work with what you have.',
      },
      {
        text: 'Let the legal process proceed and trust your attorneys\' strategy',
        fbi: 0,
        foreign: 0,
        cash: -6,
        flavor: 'Patience. Expensive patience. Your lawyers appreciate the patience.',
      },
    ],
  },

  // -------------------------------------------------------------------------
  // Phase 5: Trial and verdict (18–20)
  // -------------------------------------------------------------------------
  {
    round: 18,
    title: 'The Trial Begins',
    description:
      'Opening statements start Monday. The prosecution has 40 witnesses, 300 exhibits, and a chart showing gold bar serial numbers. Your defense team has one theory: it\'s all a coincidence.',
    options: [
      {
        text: 'Testify on your own behalf and explain everything your way',
        fbi: 22,
        foreign: 3,
        cash: 0,
        flavor: 'You are on the stand for four days. Day three is the one prosecutors replay most.',
      },
      {
        text: 'Attack the credibility of every cooperating witness',
        fbi: 12,
        foreign: 2,
        cash: 0,
        flavor: 'Their credibility is attacked. The gold bars\' credibility is untouched.',
      },
      {
        text: 'Present an alternate theory involving an elaborate misunderstanding',
        fbi: 8,
        foreign: 1,
        cash: 0,
        flavor: 'It\'s an interesting theory. The jury writes it on a notepad. Then crosses it out.',
      },
      {
        text: 'Put up a narrow defense and let the prosecution overreach',
        fbi: 3,
        foreign: 0,
        cash: 0,
        flavor: 'Surgical. Disciplined. Your defense attorney calls it "the right call." You wait.',
      },
    ],
  },
  {
    round: 19,
    title: 'The Verdict Watch',
    description:
      'The jury has been deliberating for six days. The foreperson sent a note asking for a read-back of testimony. Outside the courthouse, protesters have divided into two groups: "Free Bob" and "Lock Him Up." It\'s raining.',
    options: [
      {
        text: 'Hold a press conference on the courthouse steps calling for your acquittal',
        fbi: 10,
        foreign: 0,
        cash: 2,
        flavor: 'You are soaking wet and very confident on camera. One juror sees the clip on lunch break.',
      },
      {
        text: 'Rally your remaining Senate allies to write op-eds about prosecutorial overreach',
        fbi: 5,
        foreign: 2,
        cash: 3,
        flavor: 'Three senators write op-eds. One accidentally praises you as "someone who was great before all this."',
      },
      {
        text: 'Wait quietly with your legal team and maintain no public presence',
        fbi: 1,
        foreign: 0,
        cash: 0,
        flavor: 'Your absence is noted. For once, it works in your favor. Slightly.',
      },
      {
        text: 'Begin quietly drafting a resignation statement just in case',
        fbi: -2,
        foreign: 0,
        cash: 0,
        flavor: 'Prudent. The draft is good. You hope you never use it. You will use it.',
      },
    ],
  },
  {
    round: 20,
    title: 'The Final Gambit',
    description:
      'The jury is back. Before the verdict is read, your attorney whispers that there\'s one last move available: renouncing your party affiliation and running as an independent for your Senate seat, betting on name recognition over criminal exposure. This is your last choice.',
    options: [
      {
        text: 'Go full independent — announce the Senate run live from the courthouse',
        fbi: 15,
        foreign: 5,
        cash: 10,
        flavor: '"The people of New Jersey deserve a senator who fights for them." The verdict is read 40 minutes later.',
      },
      {
        text: 'Accept the verdict and immediately launch your re-election campaign anyway',
        fbi: 8,
        foreign: 3,
        cash: 8,
        flavor: 'Campaign website is live before you leave the parking lot. The username is available.',
      },
      {
        text: 'Announce retirement from public life to "spend time with family"',
        fbi: -5,
        foreign: -5,
        cash: 3,
        flavor: 'A graceful exit. Nadine is cautiously optimistic. The media is not.',
      },
      {
        text: 'Accept the outcome, acknowledge wrongdoing, and cooperate fully',
        fbi: -12,
        foreign: -10,
        cash: -5,
        flavor: 'The right ending. Not the fun one. But the right one. History may be kind.',
      },
    ],
  },
]

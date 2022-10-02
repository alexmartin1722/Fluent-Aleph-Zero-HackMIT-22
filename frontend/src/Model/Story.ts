import { atom } from "recoil";

// // const

export const STORYPAGE = "storypage";
export const QUIZPAGE = "quizepage";
export const OPTIONPAGE = "optionpage";
export const LOADINGPAGE = "loadingpage";

type NextActionType = {
  PageType: String;
  selectedOption?: Number;
  storyId?: Number;
};

const NextActionDefault: NextActionType = {
  PageType: OPTIONPAGE,
};

type StoryResponseType = {
  story_part_id: Number | null;
  text: String;
  image_url: String[];
  next_options: {
    "0": String;
    "1": String;
  };
  selected_option_id: Number | null;
  story_id: Number;
  quiz?: any;
};

export const StoryResponseDefault: StoryResponseType = {
  story_part_id: null,
  text: "",
  image_url: [""],
  next_options: {
    "0": "",
    "1": "",
  },
  selected_option_id: null,
  story_id: 0,
};

export const CurrentStoryState = atom({
  key: "StoryStateAtom",
  default: StoryResponseDefault,
});

export const NextActionState = atom({
  key: "NextActionAtom",
  default: NextActionDefault,
});

export const LoadingState = atom({
  key: "LoadingStateAtom",
  default: false,
});

export const StoryHistoryState = atom({
  key: "StoryHistoryStateAtom",
  default: [],
});

export const StoryPartState = atom({
  key: "StoryPartStateAtom",
  default: -1,
});

export const ForwardPauseState = atom({
  key: "FowardPauseStateAtom",
  default: false,
});

import { createTheme } from "@rneui/themed";

export default function (tw) {
  return createTheme({
    Input: {
      renderErrorMessage: false,
      inputContainerStyle: tw("border-0 rounded-lg py-0.5 px-3"),
      containerStyle: tw("p-0 mb-4"),
      inputStyle: tw("text-base font-rBold leading-5"),
      labelStyle: tw("text-sm ml-2 font-rMedium mb-2"),
      rightIconContainerStyle: tw("py-0 my-0"),
    },
    Button: {
      iconContainerStyle: tw("text-base"),
      titleStyle: tw("text-gray-900 font-rBold text-left"),
      buttonStyle: tw("py-3 text-left rounded-full"),
    },
    Overlay: {
      overlayStyle: tw("m-0 p-0 overflow-hidden rounded-xl"),
    },
    Text: {
      style: tw("font-rcRegular text-lg text-amber-50"),
      h1Style: tw("font-glamourRegular text-left text-4xl mb-4 text-amber-50"),
      h4Style: tw("font-rcMedium text-left text-xl text-amber-50")
    },
    Card: {
      containerStyle: tw("bg-neutral-800 border-0 border-none p-0 m-0 rounded-lg elevate-1"),
    },
    CardTitle: {
      style: tw("text-left"),
      h2Style: tw("font-rcSemiBold text-left text-2xl mb-4 text-amber-500 my-0")
    },
    CardFeaturedSubtitle:{
      style: tw("font-rcRegular text-left text-lg text-amber-50")
    },
    CardImage: {
      containerStyle: tw("rounded-lg")
    }
  });
}

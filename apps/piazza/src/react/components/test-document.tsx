"use client";

import {
  Document,
  Page,
  Path,
  StyleSheet,
  Svg,
  Text,
  View,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});
const TokenSvg = () => {
  return (
    <Svg viewBox="0 0 150 150">
      <Path fill="transparent" d="M 13 75 C 13 160, 138 160, 138 75" />
      <Text
        x="66.6%"
        textAnchor="middle"
        // className="font-token fill-black stroke-white stroke-2 tracking-widest"
        // style={{ paintOrder: "stroke" }}
      >
        {/* <textPath xlinkHref="#curve" textAnchor="middle"> */}
        Hello token
        {/* </textPath> */}
      </Text>
    </Svg>
  );
};
const FooToken = () => {
  return (
    <svg viewBox="0 0 150 150" className="h-full w-full text-xl uppercase">
      <path
        fill="transparent"
        id="curve"
        d="M 13 75 C 13 160, 138 160, 138 75"
      />

      <text
        x="33%"
        textAnchor="middle"
        className="font-token fill-black stroke-white stroke-2 tracking-widest"
        style={{ paintOrder: "stroke" }}
      >
        TEST
      </text>
      <text
        x="66.6%"
        textAnchor="middle"
        className="font-token fill-black stroke-white stroke-2 tracking-widest"
        style={{ paintOrder: "stroke" }}
      >
        <textPath xlinkHref="#curve" textAnchor="middle">
          Hello Base SVG
        </textPath>
      </text>
    </svg>
  );
};
const TestDocument = () => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <TokenSvg />
        <Svg>
          <FooToken />
        </Svg>
      </Page>
    </Document>
  );
};

export default TestDocument;

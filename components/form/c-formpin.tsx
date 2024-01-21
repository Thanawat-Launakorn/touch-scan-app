import React from "react";
import { CIcon } from "../icon";
import settings from "../../settings";
import { Typography } from "../typography";
import { Navigation } from "../../type/common";
import { Padding } from "../../widgets/Padding";
import { Column, Row, SizeBox } from "../../widgets";
import { useNavigation } from "@react-navigation/native";
import { responsiveHeight } from "../../utils/responsive";
import { FlatList, Pressable, Dimensions, View, Alert } from "react-native";

const width = Dimensions.get("screen").width;
type Props = {
  isAccept?: boolean;
  isTouch?: boolean;
  confirmHandler: (v: string[]) => void;
};
export const CFormPin: React.FC<Props> = React.memo(
  ({ confirmHandler, isAccept, isTouch }) => {
    const pinSize = 6;
    const navigation = useNavigation<Navigation>();
    const [pin, setPin] = React.useState<string[]>([]);

    const forgotPin = React.useCallback(() => {
      navigation.replace("Pin", { accept: false });
    }, []);

    React.useEffect(() => {
      if (pin.length === pinSize) {
        setPin([]);
        confirmHandler(pin);
      }
    }, [pin]);
    return (
      <Column flex>
        <Padding
          flex
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
          horizontal={{
            paddingHorizontal: settings.space.padding,
          }}
        >
          {isTouch ? (
            <Typography
              children="กรุณากรอกรหัส PIN"
              fontStyle={{
                fontFamily: "Kanit-Light",
              }}
              size="small"
            />
          ) : (
            <Typography
              children={isAccept ? "ยืนยันรหัส PIN CODE" : "ตั้งรหัส PIN CODE"}
              fontStyle={{
                fontFamily: "Kanit-Light",
              }}
              size="small"
            />
          )}

          <SizeBox
            vertical={{
              marginVertical: responsiveHeight(12),
            }}
          />
          <Row
            style={{
              gap: settings.space.padding,
            }}
          >
            {[...Array(pinSize).keys()].map((i) => {
              const isSelected = !!pin[i];
              return (
                <View
                  key={i}
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: width / 2,
                    backgroundColor: isSelected
                      ? settings.theme.primary
                      : "#fff",
                    borderColor: "#7A7A7A",
                    borderWidth: 1,
                  }}
                />
              );
            })}
          </Row>
          <SizeBox
            vertical={{
              marginVertical: responsiveHeight(36),
            }}
          />
          <Pad
            isTouch={isTouch}
            onPress={(item) => {
              if (item === "del") {
                setPin((prevPin) => prevPin.slice(0, prevPin.length - 1));
                return;
              }

              if (item === "finger-print") {
                Alert.alert("Touch ID", settings.alert.no_service);
              }

              if (pin.length === pinSize) {
                return;
              }

              if (+item >= 0) {
                setPin([...pin, item]);
              }
            }}
          />
          <SizeBox
            vertical={{
              marginVertical: responsiveHeight(24),
            }}
          />
          {isTouch && (
            <Typography
              children="ลืมรหัส PIN ?"
              fontStyle={{
                fontFamily: "Kanit-Light",
              }}
              size="small"
              onPressed={forgotPin}
            />
          )}
        </Padding>
      </Column>
    );
  }
);

type PadProps = {
  isTouch?: boolean;
  onPress: (v: string) => void;
};

const Pad: React.FC<PadProps> = ({ onPress, isTouch }) => {
  const touch = isTouch ? "finger-print" : "";
  const pad = [1, 2, 3, 4, 5, 6, 7, 8, 9, touch, 0, "del"];
  return (
    <FlatList
      numColumns={3}
      data={pad}
      style={{
        flexGrow: 0,
      }}
      scrollEnabled={false}
      columnWrapperStyle={{ gap: settings.space.padding }}
      contentContainerStyle={{ gap: settings.space.padding }}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => {
        return (
          <Pressable
            disabled={item === ""}
            onPress={() => onPress(String(item))}
          >
            {({ pressed }) => (
              <View
                style={[
                  {
                    width: width * 0.2,
                    height: width * 0.2,
                    borderRadius: width * 0.2,
                    borderWidth: typeof item !== "number" ? 0 : 1,
                    borderColor: "#979797",
                    alignItems: "center",
                    justifyContent: "center",
                  },
                  typeof item !== "string"
                    ? {
                        backgroundColor: pressed
                          ? settings.theme.primary
                          : "#fff",
                      }
                    : {},
                ]}
              >
                {typeof item !== "number" ? (
                  <CIcon
                    name={item === "del" ? "backspace-outline" : item}
                    color={settings.theme.primary}
                    size={30}
                  />
                ) : (
                  <Typography
                    children={String(item)}
                    fontStyle={{
                      fontFamily: "Kanit-Light",
                      fontSize: 30,
                    }}
                    color={pressed ? "#fff" : "#111"}
                  />
                )}
              </View>
            )}
          </Pressable>
        );
      }}
    />
  );
};

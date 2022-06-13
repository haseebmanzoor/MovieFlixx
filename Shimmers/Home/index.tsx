import React from "react";
import {
  Skeleton,
  VStack,
  HStack,
  Center,
  NativeBaseProvider,
} from "native-base";

const Example = () => {
  return (
    <HStack
      justifyContent="flex-start"
      alignItems="flex-start"
      alignSelf={"flex-start"}
      space={2}
    >
      <VStack
        w="32%"
        justifyContent="flex-start"
        alignItems="flex-start"
        alignSelf={"flex-start"}
        space={2}
        //top={-50}
      >
        <Skeleton h="40" speed={1} startColor="coolGray.800" opacity={0.5} />
        <Skeleton.Text
          px="1"
          lines={2}
          speed={1}
          startColor="coolGray.800"
          opacity={0.5}
        />
      </VStack>
      <VStack
        w="32%"
        justifyContent="flex-start"
        alignItems="flex-start"
        alignSelf={"flex-start"}
        space={2}
        //top={-50}
      >
        <Skeleton h="40" speed={1} startColor="coolGray.800" opacity={0.5} />
        <Skeleton.Text
          px="1"
          lines={2}
          speed={1}
          startColor="coolGray.800"
          opacity={0.5}
        />
      </VStack>
      <VStack
        w="32%"
        justifyContent="flex-start"
        alignItems="flex-start"
        alignSelf={"flex-start"}
        space={2}
        //top={-50}
      >
        <Skeleton h="40" speed={1} startColor="coolGray.800" opacity={0.5} />
        <Skeleton.Text
          px="1"
          lines={2}
          speed={1}
          startColor="coolGray.800"
          opacity={0.5}
        />
      </VStack>
    </HStack>
  );
};

export default () => {
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <Example />
      </Center>
    </NativeBaseProvider>
  );
};

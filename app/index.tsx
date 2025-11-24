import UsernameModal from "@/components/modals/UserNameModal";
import CalculatorScreen from "@/modules/home/CalculatorScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const Calculator = () => {
  const insets = useSafeAreaInsets();
  const [showUsernameModal, setShowUsernameModal] = useState(false);

  useEffect(() => {
    const checkUsername = async () => {
      const storedUsername = await AsyncStorage.getItem("username");
      if (!storedUsername) {
        setShowUsernameModal(true);
      }
    };
    checkUsername();
  }, []);

  const handleCloseModal = () => {
    setShowUsernameModal(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }} className="mt-20">
      <CalculatorScreen />
      <UsernameModal visible={showUsernameModal} onClose={handleCloseModal} />
    </SafeAreaView>
  );
};

export default Calculator;

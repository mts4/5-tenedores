import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Loading from "../Loading";
import { Input, Icon, Button } from "react-native-elements";
import { validateEmail } from "../../utils/validations";
import { size, isEmpty } from "lodash";
import * as firebase from "firebase";
import { useNavigation } from "@react-navigation/native";

const RegisterForm = ({ toastRef }) => {
  const [securityPassword, setSecurityPassword] = useState(true);
  const [securityPasswordRepeat, setSecurityPasswordRepeat] = useState(true);
  const [formData, setFormData] = useState(defaultFormValue);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const onSubmit = () => {
    if (
      isEmpty(formData.email) ||
      isEmpty(formData.password) ||
      isEmpty(formData.repeatPassword)
    ) {
      toastRef.current.show("Todos los campos son obligatorios");
    } else if (!validateEmail(formData.email)) {
      toastRef.current.show("email no valido");
    } else if (formData.password !== formData.repeatPassword) {
      toastRef.current.show("contraseñas no son iguales");
    } else if (size(formData.password) < 6) {
      toastRef.current.show(
        "la contraseña tiene q tener al menos 6 caracteres"
      );
    } else {
      setLoading(true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(formData.email, formData.password)
        .then(() => {
          setLoading(false);
          navigation.navigate("account");
        })
        .catch(() => {
          setLoading(false);
          toastRef.current.show("El email ya esta en uso.");
        });
    }
  };

  const onChange = (e, type) => {
    const { text } = e.nativeEvent;
    setFormData({ ...formData, [type]: text });
  };
  return (
    <View style={styles.formContainer}>
      <Input
        placeholder="Correo electrónico"
        containerStyle={styles.inputForm}
        onChange={(e) => onChange(e, "email")}
        rightIcon={
          <Icon type="material-community" name="at" iconStyle={styles.icon} />
        }
      />
      <Input
        placeholder="Contraseña"
        containerStyle={styles.inputForm}
        onChange={(e) => onChange(e, "password")}
        password={securityPassword}
        secureTextEntry={securityPassword}
        rightIcon={
          <Icon
            type="material-community"
            name={securityPassword ? "eye-outline" : "eye-off-outline"}
            iconStyle={styles.icon}
            onPress={() => setSecurityPassword(!securityPassword)}
          />
        }
      />
      <Input
        placeholder="Repetir contraseña"
        containerStyle={styles.inputForm}
        onChange={(e) => onChange(e, "repeatPassword")}
        password={securityPasswordRepeat}
        secureTextEntry={securityPasswordRepeat}
        rightIcon={
          <Icon
            type="material-community"
            name={securityPasswordRepeat ? "eye-outline" : "eye-off-outline"}
            iconStyle={styles.icon}
            onPress={() => setSecurityPasswordRepeat(!securityPasswordRepeat)}
          />
        }
      />
      <Button
        title="Unirse"
        containerStyle={styles.btnContainerRegister}
        buttonStyle={styles.btnRegister}
        onPress={onSubmit}
      />
      <Loading isVisible={loading} text="Creando cuenta" />
    </View>
  );
};

export default RegisterForm;

function defaultFormValue() {
  return {
    email: "",
    password: "",
    repeatPassword: "",
  };
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  inputForm: {
    width: "100%",
    marginTop: 20,
  },
  btnContainerRegister: {
    marginTop: 20,
    width: "95%",
  },
  btnRegister: {
    backgroundColor: "#00a680",
  },
  icon: {
    color: "#c1c1c1",
  },
});

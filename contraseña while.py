print("hola escriba su nombre y contraseña")
input("NOMBRE")

contraseña=input("escriba su contraseña")
confirmacion=input("repita su contraseña")

while contraseña != confirmacion:
    print(" repita la contraseña:")
    contraseña = input("ha quedado mal escriba su contraseña de nuevo:")
    confirmacion = input("repita su contraseña")

if contraseña== confirmacion:
 print("bien puedes continuar")




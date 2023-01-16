
import os

def main():
    user_path= "c:\\Users\\" + os.getlogin()
    introduce_tu_nombre=input("ingresa el usuario: ")
    introduce_tu_contrasena=input("ingresa la contraseña: ")
    repite_contraseña=input("repite la contraseña")

    while repite_contraseña != introduce_tu_contrasena:
            print("contraseña erronea repite bien tu contraseña")
            repite_contraseña=input("repite la contraseña")


    file= open(user_path+"\\OneDrive\\aro mi perro.txt", "w")
    file.write(introduce_tu_nombre + "  Nombre de usuario" " \n")
    file.write(introduce_tu_contrasena +"  contraseña de usuario"+" \n")
    file.close()

if __name__ == "__main__":
    main()
#
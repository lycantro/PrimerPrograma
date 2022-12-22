from random import randint
from time import sleep
#por cada tantos usdts gastados el randon .randint cambia

#aqui ingresamos el dinero
dinero_ingresado= int(input("ingresa la cantidad de usdt a jugar\n"                           
                           "$"))
dinero= dinero_ingresado





#aqui seleccionamos que moneda vamos a usar
apuesta_eleccion=input("con cuanto apuestas \n"
                         "a = 15 centavos \n"
                         "b = 25 centavos\n"
                         "c = 50 centavos \n")
#contador regresivo del randint

if apuesta_eleccion == "a":
    print(" has seleccionado la apuesta menor buena suerte")


    while True:
             enter=input(f" oprima enter para jugar")

             numero_1 = randint(1, 10)
             numero_2 = randint(1, 10)
             numero_3 = randint(1, 10)
             dinero -= 0.15
             #print(f"nunero ganador es  : {numero_1},{numero_2},{numero_3},tu saldo es : {dinero}")
             print(f"tu saldo es = {dinero}")
             print(numero_1, end=" ")
             sleep(0.40)
             print(numero_2,end=" ")
             sleep(0.40)
             print(numero_3,end=" ")
             sleep(0.40)


             # numero ganador 1
             if (numero_1, numero_2, numero_3) == (7, 7, 7):
                 dinero += 10
                 print(f"felicidades has ganado 5 usdt {dinero}")
             elif (numero_1, numero_2, numero_3) == (6, 6, 6):
                 dinero += 20
                 print(f"felicidades has ganado una 10 usdt {dinero}")

             elif (numero_1, numero_2, numero_3) == (7, 7, 7):
                 dinero += 30
                 print(f"felicidades has ganado una 10 usdt {dinero}")
             elif (numero_1, numero_2, numero_3) == (3, 2, 3):
                 dinero += 40
                 print(f"felicidades has ganado una 10 usdt {dinero}")

             elif (numero_1, numero_2, numero_3) == (7, 7, 7):
                 dinero += 50
                 print(f"felicidades has ganado una 10 usdt {dinero}")

#desde aqui juega con la opcion b
elif apuesta_eleccion== "b":
    print(" has seleccionado la opcion b ")
    dinero = dinero_ingresado

    while True:
            enter = input(f" oprima enter para jugar")

            numero_1 = randint(1, 7)
            numero_2 = randint(1, 7)
            numero_3 = randint(1, 7)
            dinero -= 0.25
            # print(f"nunero ganador es  : {numero_1},{numero_2},{numero_3},tu saldo es : {dinero}")
            print(f"tu saldo es = {dinero}")
            print(numero_1, end=" ")
            sleep(0)
            print(numero_2, end=" ")
            sleep(0)
            print(numero_3, end=" ")
            sleep(0)

            # numero ganador 1
            if (numero_1, numero_2, numero_3) == (7, 7, 7):
                dinero += 200
                print(f"felicidades has ganado 5 usdt {dinero}")
            elif (numero_1, numero_2, numero_3) == (6, 6, 6):
                dinero += 20
                print(f"felicidades has ganado una 10 usdt {dinero}")

            elif (numero_1, numero_2, numero_3) == (7, 7, 7):
                dinero += 200
                print(f"felicidades has ganado una 10 usdt {dinero}")
            elif (numero_1, numero_2, numero_3) == (3, 2, 3):
                dinero += 100
                print(f"felicidades has ganado una 10 usdt {dinero}")

            elif (numero_1, numero_2, numero_3) == (7, 7, 7):
                dinero += 200
                print(f"felicidades has ganado una 10 usdt {dinero}")
#opcion 3 50 centavos
elif apuesta_eleccion== "c":
    print(" has seleccionado la opcion b ")
    dinero = dinero_ingresado

    while True:
            enter = input(f" oprima enter para jugar")

            numero_1 = randint(1, 7)
            numero_2 = randint(1, 7)
            numero_3 = randint(1, 7)
            dinero -= 0.50
            # print(f"nunero ganador es  : {numero_1},{numero_2},{numero_3},tu saldo es : {dinero}")
            print(f"tu saldo es = {dinero}")
            print(numero_1, end=" ")
            sleep(0)
            print(numero_2, end=" ")
            sleep(0)
            print(numero_3, end=" ")
            sleep(0)

            # numero ganador 1
            if (numero_1, numero_2, numero_3) == (7, 7, 7):
                dinero += 200
                print(f"felicidades has ganado 5 usdt {dinero}")
            elif (numero_1, numero_2, numero_3) == (6, 6, 6):
                dinero += 20
                print(f"felicidades has ganado una 10 usdt {dinero}")

            elif (numero_1, numero_2, numero_3) == (7, 7, 7):
                dinero += 200
                print(f"felicidades has ganado una 10 usdt {dinero}")
            elif (numero_1, numero_2, numero_3) == (3, 2, 3):
                dinero += 100
                print(f"felicidades has ganado una 10 usdt {dinero}")

            elif (numero_1, numero_2, numero_3) == (7, 7, 7):
                dinero += 200
                print(f"felicidades has ganado una 10 usdt {dinero}")

















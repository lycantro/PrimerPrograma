import random
import time


dinero_ingresado= float(input("ingresa la cantidad de usdt a jugar\n"
                            "$"))

apuesta_eleccion=input("con cuanto apuestas \n"
                "a = 15 centavos \n"
                "b = 25 centavos \n"
                "c = 50 centavos  ")


if apuesta_eleccion == "a":
    print(" has seleccionado la apuesta menor buena suerte")

    dinero = dinero_ingresado


    if dinero == 0:
        print("no tienes saldo suficiente deseas reiniciar???")




    nummero_ganador2= 5
    numero_ganador3= 5
    numero_ganador4= 5
    numero_ganador6= 300
    numero_ganador7= 150

    premio= nummero_ganador2 and numero_ganador3 and numero_ganador4


    #valores para la apuesta de 25 centavos

#debo entender que para los tres numeros individuales debo juntar los 3 y dar un resultado ganador como lo hare?
    # la primera opcion a intetar es al finalizar recoja un print y qeu los compare con los nyumeros ganadores asignados
    # debo saber como restar al randint


    while True:




            numero_mostrado = random.randint(4, 5)

            numero_mostrado2= random.randint(4, 5)

            numero_mostrado3= random.randint(4, 5)
            # de 1 a 8




            enter =(input("oprime la palanca 15 centavo [enter]"))
            if enter == True:
                print("probando")

            print("numeroganador {}{}{}".format(numero_mostrado,numero_mostrado2,numero_mostrado3))



            if numero_mostrado == numero_mostrado2 == numero_mostrado3  == premio:
                dinero += 500
                print(" felicidades has ganado 500 usdt{}".format(dinero))
            elif numero_ganador3 == numero_mostrado:
                dinero += 1000
                print(" felicidades has ganado el jackpot te llevas 1000{}".format(dinero + 1000))
            elif numero_ganador4 == numero_mostrado:
                dinero += 200
                print("felicidades ganas 200")
            elif numero_ganador6 == numero_mostrado:
                dinero += 700
                print("felicidades llevas 500 usdt{}".format(dinero + 500))
            elif numero_mostrado != numero_ganador7 and numero_ganador6 and numero_ganador4 and numero_ganador3 and nummero_ganador2:
                dinero -= 0.15
            print("tu saldo es = {}".format(dinero))
    # hasta aqui va bien el codigo solo debemos cambiar repetir el juego con l a cantidd a ingresar
            while dinero == 0.25:
                seguir=input("deseas seguir jugando?[s/n]")
                if seguir== "s":
                    dinero_ingresado = float(input("ingresa la cantidad de usdt a jugar\n"
                                                   "$"))
#aqui va para los 25 centavos



elif apuesta_eleccion== "b":
    print(" has seleccionado la opcion b ")
    dinero = dinero_ingresado



    while True:

        numero_ganador8 = 700
        numero_ganador9 = 411
        numero_ganador10 = 201
        numero_ganador11 = 500





        numero_mostrado = random.randint(699, 800)

        enter = (input("oprime la palanca 25 centavo [enter]"))
        print("numero ganador = {}".format(numero_mostrado))

        if numero_ganador8 == numero_mostrado:
            dinero +=1000
            print(" felicidades has ganado 100 usdt{}".format(dinero + 100))
        elif numero_ganador9 == numero_mostrado:
            dinero += 2000
            print(" felicidades has ganado el jackpot te llevas 1000{}".format(dinero + 1000))
        elif numero_ganador10 == numero_mostrado:
            dinero += 3000
            print("felicidades te llevas el doble de lo ingresado")
        elif numero_ganador11 == numero_mostrado:
            dinero += 4000
            print("felicidades llevas 500 usdt{}".format(dinero + 500))
        elif numero_mostrado != numero_ganador8 and numero_ganador9 and numero_ganador10 and numero_ganador11:
            dinero -= 0.25
        print("tu saldo es = {}".format(dinero))

        # aqui va para los 50 centavos


elif apuesta_eleccion == "c":
        print("has seleccionado la opcion ce de 50 centavos ")
        dinero= dinero_ingresado





        while True:
            numero_ganador12 = 999

            numero_ganador13 = 444

            numero_ganador14 = 152

            numero_ganador15 = 759
            numero_mostrado = random.randint(699, 800)





            enter = (input("oprime la palanca 50 centavo [enter]"))
            print("numero ganador = {}".format(numero_mostrado))

            if numero_ganador12 == numero_mostrado:
                dinero += 1000
                print(" felicidades has ganado 100 usdt{}".format(dinero + 100))
            elif numero_ganador13 == numero_mostrado:
                dinero += 2000
                print(" felicidades has ganado el jackpot te llevas 1000{}".format(dinero + 1000))
            elif numero_ganador14 == numero_mostrado:
                dinero += 3000
                print("felicidades te llevas el doble de lo ingresado")
            elif numero_ganador15 == numero_mostrado:
                dinero += 4000
                print("felicidades llevas 500 usdt{}".format(dinero + 500))
            elif numero_mostrado != numero_ganador12 and numero_ganador13 and numero_ganador14 and numero_ganador15:
                dinero -= 0.50
            print("tu saldo es = {}".format(dinero))

import random
dinero_ingresado= float(input("ingresa la cantidad de usdt a jugar\n"
                            "$"))
dinero = dinero_ingresado
if dinero == 0:
    print("no tienes saldo suficiente deseas reiniciar???")


numero_mostrado = random.randint(499,501)
nummero_ganador2= 500
numero_ganador3= 777
numero_ganador4= 444
numero_ganador6= 300



while True:




        enter =(input("oprime la palanca 25 centavo [enter]"))


        numero_mostrado = random.randint(99, 1000)
        nummero_ganador2= 500
        numero_ganador3 = 777
        numero_ganador4 = 444
        numero_ganador6 = 300
        numero_ganador7 = 111
        # 4 faltantes de premios  una sola
        print("numero ganador = {}".format(numero_mostrado))

        if nummero_ganador2 == numero_mostrado:
            print(" felicidades has ganado 100 usdt{}".format(dinero + 100))
        elif numero_ganador3 == numero_mostrado:
            print(" felicidades has ganado el jackpot te llevas 1000{}".format(dinero + 1000))
        elif numero_ganador4 == numero_mostrado:
            print("felicidades te llevas el doble de lo ingresado")
        elif numero_ganador6 == numero_mostrado:
            print("felicidades llevas 500 usdt{}".format(dinero + 500))
        elif numero_mostrado != numero_ganador7 and numero_ganador6 and numero_ganador4 and numero_ganador3 and nummero_ganador2:
            dinero -= 0.25
        print("tu saldo es = {}".format(dinero))
# hasta aqui va bien el codigo solo debemos cambiar repetir el juego con l a cantidd a ingresar
        while dinero == 0.25:
            seguir=input("deseas seguir jugando?[s/n]")
            if seguir== "s":
                dinero_ingresado = float(input("ingresa la cantidad de usdt a jugar\n"
                                               "$"))








        #numero_mostrado != nummero_ganador2  and numero_ganador3 and numero_ganador4 and numero_ganador6
            #print("mostro{}".format(dinero-0.25))




# vida_alakazan -= 10




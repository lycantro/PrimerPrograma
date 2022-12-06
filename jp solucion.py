import random
dinero_ingresado= int(input("ingresa la cantidad de usdt a jugar\n"
                            "$"))
comision = 0.25
numero_ganador1 = 6
numero_ganador2 = 8
numero_ganador3 = 10
numero_ganador4 = 15
numero_ganador5 = 11


while True:
        numero_mostrado = random.randint(1,15 )
        enter = input("Oprime la palanca 0.25 centavos [enter]")
        saldo = dinero_ingresado-comision
        print("El numero arrojado es: {} ".format(numero_mostrado))


        if numero_ganador1 == numero_mostrado:
            saldo += 100
            print(" felicidades has ganado 100 usdt\n"
                  "enter para seguir ganando")
            print("Su saldo actual es {}".format(saldo))
        elif numero_ganador2 == numero_mostrado:
            saldo += 1000
            print("Felicidades has ganado el jackpot te llevas 1000\n"
                  "Oprima enter para seguir ganando\n")
            print("Su saldo actual es {}".format(saldo))
        elif numero_ganador3 == numero_mostrado:
            saldo = saldo*2
            print("felicidades te llevas el doble de lo ingresado\n"
                  "Oprima enter para seguir ganando\n")
            print("Su saldo actual es {}".format(saldo))
        elif numero_ganador4 == numero_mostrado:
            saldo += 500
            print("felicidades llevas 500 usdt\n"
                  "Oprima enter para seguir ganando\n")
            print("Su saldo actual es {}".format(saldo))
        elif numero_ganador5 == numero_mostrado:
            saldo += 500
            print("felicidades llevas 500 usdt\n"
                  "Oprima enter para seguir ganando\n")
            print("Su saldo actual es {}".format(saldo))
        elif numero_ganador1 and numero_ganador2 and numero_ganador3 and numero_ganador4 and numero_ganador5 != numero_mostrado :
            print("has perdido, sigue jugando \n")
            print("Su saldo actual es {}".format(saldo))
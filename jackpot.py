import random
dinero_ingresado= int(input("ingresa la cantidad de usdt a jugar\n"
                            "$"))

enter=input("bienvenido al tragacriptos \n"
            "oprime la palanca 1 centavo [enter]")

numero_mostrado = random.randint(99,1000)
nummero_ganador2= 500
numero_ganador3= 777
numero_ganador4= 444
numero_ganador6= 300

print(numero_mostrado)

if nummero_ganador2 == numero_mostrado:
    print(" felicidades has ganado 100 usdt")
if numero_ganador3 == numero_mostrado:
    print(" felicidades has ganado el jackpot te llevas 1000")
if numero_ganador4 == numero_mostrado:
    print ("felicidades te llevas el doble de lo ingresado")
if numero_ganador6 == numero_mostrado:
    print("felicidades llevas 500 usdt")
else: print("sigue intentando")



while True:
        enter = input(
                      "oprime la palanca 1 centavo [enter]")
        numero_mostrado = random.randint(99, 1000)
        nummero_ganador2= 500
        numero_ganador3 = 777
        numero_ganador4 = 444
        numero_ganador6 = 300
        numero_ganador7 = 111
        print(numero_mostrado)

        if nummero_ganador2 == numero_mostrado:
            print(" felicidades has ganado 100 usdt\n"
                  "enter para seguir ganando")
        if numero_ganador3 == numero_mostrado:
            print(" felicidades has ganado el jackpot te llevas 1000\n"
                  "oprime enter para seguir ganando")
        if numero_ganador4 == numero_mostrado:
            print("felicidades te llevas el doble de lo ingresado\n"
                  "oprime enter para seguir ganando ")
        if numero_ganador6 == numero_mostrado:
            print("felicidades llevas 500 usdt\n"
                  "oprime enter para seguir ganando")








#enter=input("oprime [y]para continuar")
#while enter == "y":
    ##numero_ganador = random.randint(1, 10)
    #numero = (int(input()))

    #if numero != numero_ganador:
       # print("reinicia el programa has perdido")

    #if numero == numero_ganador:
        #print("has ganado")
   # if numero > 10:
       # print("seleccionaste un numero mayor a uno reinicia el juego")
    #if numero < 1:
       # print("seleccionaste un numero inferior a uno")
   # else:
        #print("debes seleccionar un numero")

   # print("el numero ganador era {}".format(numero_ganador))

import random

print ("escoge un numero de l uno al diez")
numero_ganador = random.randint(1, 10)
numero = int(input(   ))


if numero != numero_ganador:
    print ("reinicia el programa has perdido")

if numero == numero_ganador:
    print ("felicidades sapo ha")
if numero > 10:
    print("vea bien ta se paso")
if numero < 1:
    print("bobo mk es despues del 1 no antes")

print ("el numero ganador era {}".format(numero_ganador))



 




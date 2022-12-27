import random
print("hola y bienvenido al concurso de fotografia de jp ingresa los siguientes datos  para obtener un descuento hasta del 20% ")
estrato=int(input ( "estrato = "))
salario= int(input ("salario"))
edad = int(input ("edad = "))


if estrato == 1 and salario < 1000000:

   print ("felicidades aplicas al descuento de estrato 1 30%")



if estrato == 2 and salario < 1500000:

   print ("felicidades aplicas al descuento de estrato 2 20%")

else: print("para estrato 2 no aplicas ")

#
if estrato == 3 and salario > 1500000:

   print ("felicidades aplicas al descuento de estrato 3 5%")

else: print("para estrato 3 no aplicas ")


from random import randint
import os
print("BIENVENIDO A LA BATALLLA POKEMON"
      "")
vida_pikachu = 80
vida_alakazan = 80
while vida_pikachu > 0 and vida_alakazan > 0:
    #aqui empieza la batalla
    print("turno de pikachu")
    ataque_pikachu = randint(1, 3,)
    if ataque_pikachu == 1:
        print("pikachu usa placaje")
        vida_alakazan -= 10

    elif ataque_pikachu == 2:
        print("pikachu usa impact trueno")
        vida_alakazan -= 15

    elif ataque_pikachu == 3:
         print("pikachu usa bomba electrica")
         vida_alakazan -=13

    print("vida alakazan: {}".format (vida_alakazan))
    #barra_de_vida=int(vida_pikachu * 10 / vida_pikachu)
    #print("pikachu {{

    input("Enter para continuar")
    os.system("cls")



    # turno alakazan
    print("turno de alakzan")


    ataque_alakazan= input ("que ataque realizas\n"
                            " placaje[p]\n"
                            " hipnosis[h]\n"
                            " latigo[l]\n"
                            "")


    if ataque_alakazan == "p":
        print("has usado ataque de placaje ")
        vida_pikachu -= 17
    elif ataque_alakazan == "h":
        print("alakazan usa hipnosis")
        vida_pikachu -= 14
    elif ataque_alakazan == "l":
        print ("alakazan usa latigo")
        vida_pikachu -= 12
    else:
        print("pierdes el turno selecciona uno de los ataques")
    print("vida de pikachu",format(vida_pikachu))

    while vida_pikachu < 0 :
          print("pikachu pierde")
          break
    while vida_alakazan < 0:
          print(" alakazan pierde")
          break
print("reinicia el juego")

    #if vida_pikachu < 0:
        #print("pierde pikachu ha perdido")
    #elif vida_alakazan < 0:
        #print("alakazan pierde")





# nota cuando pikachu gana  se acaba el proceso y no dicta el ganador





















   # aqui va el codigo antiguo

#  while ataque_alakazan != "p" and ataque_alakazan != "h" and ataque_alakazan != "l":

   #if ataque_pikachu == 1:
      #bola voltio
   # print("pikachu ataca con la bola voltio ")
   # vida_alakazan -= 10
   #else:
      # print("pikachu ataca con onda")
      # vida_alakazan -= 15
       #print("la vida de alacazan es [####_],",format (vida_alakazan))



       # turno alakazan
     #  print ("turno alakazan")

      # ataque_alakazan= None
      # while ataque_alakazan != "p" and ataque_alakazan != "a" and ataque_alakazan != "c":
       #  ataque_alakazan = input("¿que ataque deseas realizar [p]lacaje[h]ipnosis[c]ocotazo")


       #if  ataque_alakazan == "p":
         #  print("alakazan usa placaje")
         #  vida_pikachu -= 10
      # elif ataque_alakazan == "h":
           #vida_pikachu -= 11
           #print("alakazan usa hipnosis")
       #elif ataque_alakazan == "c":
          # vida_pikachu -= 13
          # print("alakazan uso cocotazo")

      # print("la vida de pikachu es",format(vida_pikachu))








SALIDA= "s"
items= ["pollo","maiz"]

def preguntar_producto_usuario():
    return input("introduce un producto [{} para salir]".format(SALIDA))


def document (lista_compra):
    nombre_del_archivo= input(" como quieres que se llame tu archivo?")
    a = open (nombre_del_archivo + ".txt","w")
    a.write("\n".join(lista_compra))
    a.close()

def main():
    lista_compra = []

    input_de_usuario = preguntar_producto_usuario()

    while input_de_usuario != SALIDA:
        lista_compra.append(input_de_usuario)
        print("\n".join(lista_compra))
        input_de_usuario = preguntar_producto_usuario()

    document(lista_compra)

if __name__ == "__main__":
    main()



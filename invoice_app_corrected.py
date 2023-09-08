
import tkinter as tk
from tkinter import simpledialog, messagebox, ttk
import pickle

MAX_DATES = 7  # Maximum number of editable dates

# Function to save data
def guardar_datos(data):
    with open('data.pkl', 'wb') as f:
        pickle.dump(data, f)

# Function to load data
def cargar_datos():
    try:
        with open('data.pkl', 'rb') as f:
            return pickle.load(f)
    except FileNotFoundError:
        return {}

# Function to generate the invoice and calculate total amount
def generar_invoice(data):
    total_amount = 0

    ventana_invoice = tk.Toplevel(root)
    ventana_invoice.title("Invoice Details")

    # Displaying all the entered details in a neat manner
    for key, value in data.items():
        frame_info = tk.Frame(ventana_invoice)
        frame_info.pack(fill='x', padx=10, pady=5)
        label_key = tk.Label(frame_info, text=f"{key}:", width=20, anchor='e')
        label_key.pack(side='left')
        label_value = tk.Label(frame_info, text=value)
        label_value.pack(side='left')

    ttk.Separator(ventana_invoice, orient='horizontal').pack(fill='x', padx=10, pady=10)

    # Treeview to display the invoice in the new window
    tree = ttk.Treeview(ventana_invoice, columns=('Fecha', 'Horas Trabajadas', 'Pago Total'), show='headings')
    tree.heading('Fecha', text='Fecha')
    tree.heading('Horas Trabajadas', text='Horas Trabajadas')
    tree.heading('Pago Total', text='Pago Total')

    # Adding data to the treeview and calculating total amount
    for fecha, horas in zip(fechas, horas_trabajadas):
        pago_total = float(horas) * float(data['Pago por Hora'])
        total_amount += pago_total
        tree.insert('', 'end', values=(fecha, horas, f"${pago_total:.2f}"))

    tree.pack(padx=10, pady=5)

    # Display the total amount in the new window
    label_total = tk.Label(ventana_invoice, text=f"Total a Cobrar: ${total_amount:.2f}", font=("Arial", 12, "bold"))
    label_total.pack(pady=10)

# Function to add dates and worked hours
def agregar_fecha():
    if len(fechas) < MAX_DATES:
        fecha = simpledialog.askstring("Agregar Fecha", "Ingrese la fecha en formato YYYY-MM-DD:")
        if fecha:
            horas = simpledialog.askstring("Horas trabajadas", "Ingrese las horas trabajadas en esa fecha:")
            if horas:
                fechas.append(fecha)
                horas_trabajadas.append(horas)
                actualizar_lista_fechas()
                mostrar_fechas()
    else:
        messagebox.showinfo("Información", "Has alcanzado el máximo de fechas permitidas.")

def mostrar_fechas():
    fecha_entries.clear()
    horas_entries.clear()
    for widget in frame_fechas.winfo_children():
        widget.destroy()

    for idx, (fecha, horas) in enumerate(zip(fechas, horas_trabajadas)):
        frame_fecha = tk.Frame(frame_fechas)
        frame_fecha.pack(fill='x', padx=10, pady=5)
        
        # Making the dates and hours editable
        label_idx = tk.Label(frame_fecha, text=f"Fecha {idx+1}:", width=10)
        label_idx.pack(side='left')

        entry_fecha = tk.Entry(frame_fecha, width=20)
        entry_fecha.insert(0, fecha)
        entry_fecha.pack(side='left', padx=5)
        fecha_entries.append(entry_fecha)

        label_horas = tk.Label(frame_fecha, text="Horas:", width=5)
        label_horas.pack(side='left')

        entry_horas = tk.Entry(frame_fecha, width=5)
        entry_horas.insert(0, horas)
        entry_horas.pack(side='left', padx=5)
        horas_entries.append(entry_horas)

def actualizar_lista_fechas():
    updated_fechas = [entry.get() for entry in fecha_entries]
    updated_horas = [entry.get() for entry in horas_entries]
    guardar_datos({'campos': {campo: entradas[campo].get() for campo in campos}, 'fechas': updated_fechas, 'horas_trabajadas': updated_horas})

# Main window
root = tk.Tk()
root.title("Generador de Invoice")

datos_previos = cargar_datos()
campos_datos_previos = datos_previos.get('campos', {})
fechas = datos_previos.get('fechas', [])
horas_trabajadas = datos_previos.get('horas_trabajadas', [])
fecha_entries = []
horas_entries = []

# Fields to enter data
campos = ['Nombre', 'Número de Banco', 'BNB', 'BSB', 'Lugar de Trabajo', 'Pago por Hora', 'Nombre de la Empresa']
entradas = {}

for campo in campos:
    frame_campo = tk.Frame(root)
    frame_campo.pack(fill='x', padx=10, pady=5)
    label = tk.Label(frame_campo, text=campo, width=20, anchor='e')
    label.pack(side='left')
    entrada = tk.Entry(frame_campo)
    entrada.pack(side='left', fill='x', expand=True, padx=5)
    entrada.insert(0, campos_datos_previos.get(campo, ""))
    entradas[campo] = entrada

# Section to show and add dates and worked hours
label_fechas = tk.Label(root, text="Fechas de Trabajo y Horas", font=("Arial", 12, "bold"))
label_fechas.pack(pady=10)
frame_fechas = tk.Frame(root)
frame_fechas.pack(fill='x')
mostrar_fechas()

btn_agregar_fecha = tk.Button(root, text="Agregar Fecha", command=agregar_fecha)
btn_agregar_fecha.pack(pady=10)

# Button to generate invoice
btn_generar = tk.Button(root, text="Generar Invoice", command=lambda: generar_invoice({campo: entradas[campo].get() for campo in campos}))
btn_generar.pack(pady=10)

# Button to save data
btn_guardar = tk.Button(root, text="Guardar Datos", command=actualizar_lista_fechas)
btn_guardar.pack(pady=10)

root.mainloop()

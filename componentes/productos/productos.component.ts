import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  scrollPosition = 0;
  productos: any[] = [];
  newProducto: any = {};
  editingProducto: any = null;
  selectedFile: File | null = null; 
  error = '';
  filter: string = '';


  private apiUrl = 'http://localhost:3000/api/productos';

  constructor(private productoService: ProductoService, private router: Router) { }
 
  ngOnInit(): void {
    this.loadProductos();
  }

  loadProductos(): void {
    this.productoService.getProductos().subscribe(
      data => {
        this.productos = data;
      },
      err => {
        console.error('Error obteniendo productos:', err);
        this.error = 'Error en el servidor al obtener productos.';
      }
    );
  }

  onFileChange(event: Event): void {
    const element = event.target as HTMLInputElement;
    if (element.files && element.files.length > 0) {
      this.newProducto.imagen_pro = element.files[0];
    }
  }

  createProducto(): void {
    this.productoService.createProducto(this.newProducto).subscribe(
      data => {
        this.productos.push(data);
        this.newProducto = {};
        this.router.navigate(['productos']);
      },
      err => {
        console.error('Error creando producto:', err);
        this.error = 'Error en el servidor al crear producto.';
      }
    );
  }

  editProducto(producto: any): void {
    this.editingProducto = { ...producto };
  }

  updateProducto(comp_id: number): void {
    if (this.selectedFile && !this.editingProducto.imagen_pro) {
      this.productoService.uploadImagen(this.selectedFile).subscribe(
        response => {
          this.editingProducto.imagen_pro = response.imageUrl;
          this.saveUpdatedProducto(comp_id);
        },
        error => {
          console.error('Error al cargar la imagen:', error);
        }
      );
    } else {
      this.saveUpdatedProducto(comp_id);
    }
  }

  saveUpdatedProducto(comp_id: number): void {
    this.productoService.updateProducto(comp_id, this.editingProducto).subscribe(
      data => {
        const index = this.productos.findIndex(p => p.comp_id === comp_id);
        if (index !== -1) {
          this.productos[index] = data;
        }
        this.editingProducto = null;
      },
      err => {
        console.error('Error actualizando producto:', err);
        this.error = 'Error en el servidor al actualizar producto.';
      }
    );
  }

  deleteProducto(id: number): void {
    if (id) {
      this.productoService.deleteProducto(id).subscribe(
        data => {
          this.productos = this.productos.filter(p => p.comp_id !== id);
          this.router.navigate(['productos']);
        },
        err => {
          console.error('Error eliminando producto:', err);
          this.error = 'Error en el servidor al eliminar producto.';
        }
      );
    } else {
      console.error('No se encontró el producto:', id);
    }
  }
}

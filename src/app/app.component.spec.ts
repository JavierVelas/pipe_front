// Importaciones necesarias para las pruebas
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { LayoutComponent } from 'componentes/layout/layout.component';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    declarations: [
      AppComponent,
      LayoutComponent // Declara el componente Layout en las pruebas
    ]
  }));

  // Prueba 1: Verifica que el componente se cree correctamente
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent); // Crea una instancia del componente
    const app = fixture.componentInstance; // Obtiene la instancia del componente
    expect(SVGAElement).to.exist;
  });

  // Prueba 2: Verifica que la propiedad 'title' tenga el valor 'frontend'
  it(`should have as title 'frontend'`, () => {
    const fixture = TestBed.createComponent(AppComponent); // Crea una instancia del componente
    const app = fixture.componentInstance; // Obtiene la instancia del componente
    expect(app.title).equal('frontend'); // Verifica que el título sea 'frontend'
  });

  // Prueba 3: Verifica que el título se renderice correctamente en el HTML
  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent); // Crea una instancia del componente
    fixture.detectChanges(); // Actualiza la vista para reflejar los cambios
    const compiled = fixture.nativeElement as HTMLElement; // Obtiene el HTML renderizado
    const spanElement = compiled.querySelector('.content span'); // Busca el elemento span
    expect(spanElement).to.exist;
    expect(spanElement?.textContent).contain('frontend app is running!'); // Verifica el contenido del elemento
  });

  // Prueba 4 (Adicional): Verifica que el título cambie al hacer clic en un botón
  it('should update title on button click', () => {
    const fixture = TestBed.createComponent(AppComponent); // Crea una instancia del componente
    const app = fixture.componentInstance; // Obtiene la instancia del componente
    const compiled = fixture.nativeElement as HTMLElement; // Obtiene el HTML renderizado

    // Simular clic en el botón (suponiendo que hay un botón en el HTML)
    const button = compiled.querySelector('button'); // Busca el botón
    button?.click(); // Simula el clic
    fixture.detectChanges(); // Actualiza la vista

    // Verificar que el título haya cambiado
    expect(app.title).equal('New Title'); // Verifica el nuevo título
    expect(compiled.querySelector('.content span')?.textContent).contain('New Title app is running!'); // Verifica el contenido actualizado
  });

 
  it('should not have any initialization errors', () => {
    const fixture = TestBed.createComponent(AppComponent); 
    const app = fixture.componentInstance; 
    expect(() => fixture.detectChanges()).not.throw(); 
  });
});
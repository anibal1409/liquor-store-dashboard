import { Location } from '@angular/common';
import {
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';

import { isEqual } from 'lodash';
import { Subscription } from 'rxjs';
import { ToastService } from 'toast';

import {
  CustomCurrencyMaskConfig,
} from '../../common/currency-mask/mask-config';
import { ProductItemVM } from '../../products';
import {
  SaleProduct,
  SaleVM,
} from '../models';
import {
  STAGE_SALE,
  STAGES_ACTIVES,
  StageSale,
} from '../models/stage';
import { StudiesService } from '../studies.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy {
  @Input()
  id!: number;

  form!: FormGroup;
  sub$ = new Subscription();
  loading = false;
  submitDisabled = true;

  oldFormValue: SaleVM = {
    status: true,
    id: 0,
    date: new Date().toDateString(),
    customerId: 0,
    stage: StageSale.Pending,
    saleProducts: [],
    total: 0,
    note: '',
  };

  stagesStudy = STAGE_SALE;

  optionsCurrency = CustomCurrencyMaskConfig;

  showValuesAccept = [
    StageSale.Pending,
  ];
  showValuesPrint = [
    StageSale.Paid,
    StageSale.Printed,
  ];
  hiddenFooter = false;
  showDelete = true;
  showPrint = false;

  productsBase: Array<ProductItemVM> = [];
  products: Array<ProductItemVM> = [];
  ctrlProduct = new FormControl();

  formDisabled = false;
  subArray$ = new Subscription();

  constructor(
    private entityService: StudiesService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    private location: Location,
  ) { }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

  ngOnInit(): void {
    this.sub$.add(
      this.activatedRoute.queryParams.subscribe(
        (queryParams) => {
          if (queryParams['id']) {
            this.id = +queryParams['id'];
            this.loadData();
          }
        }
      )
    );
    this.sub$.add(
      this.entityService.getLoading$().subscribe((loading) => {
        this.loading = loading;
      })
    );
    this.getProducts();
    this.createForm();
    this.loadData();
  }

  loadData(): void {
    if (this.id) {
      this.sub$.add(
        this.entityService
          .find$({ id: this.id })
          .subscribe((entity) => {
            console.log(entity);
            if (entity && !this.oldFormValue.id) {
              this.oldFormValue = {
                customerId: entity.customerId,
                customerDocument: entity.customer?.idDocument,
                customerName: entity.customer?.name,

                date: entity.date,
                stage: entity.stage,
                id: entity.id,

                total: entity.total,
                saleProducts: entity.saleProducts.map(
                  (saleProduct) => {
                    return {
                      id: saleProduct.id,
                      productId: saleProduct.product?.id,
                      amount: saleProduct.amount,
                      name: saleProduct.product?.name,
                      price: saleProduct.price,
                      subtotal: saleProduct.subtotal,
                    };
                  }
                ),
              } as any;
              this.form.patchValue(
                {
                  ...this.oldFormValue,
                },
                {
                  emitEvent: false,
                }
              );
              this.form.get('customerDocument')?.disable();
              for (const saleProduct of entity.saleProducts) {
                this.addExam(saleProduct);
              }
              this.updateProductValue();
            }
          })
      );
    }
  }

  clickClosed(): void {
    this.router.navigate(['/dashboard/sales']);
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      customerId: [null, [Validators.required]],
      customerDocument: [null, [Validators.required]],
      customerName: [{ value: '', disabled: true }],

      date: [new Date(), [Validators.required]],
      stage: [StageSale.Pending, [Validators.required]],
      id: [0],

      total: [{ value: 0, disabled: true }, [Validators.required]],
      saleProducts: this.formBuilder.array([]),
    });

    this.sub$.add(
      this.form.valueChanges.subscribe(() => {
        this.submitDisabled =
          isEqual(this.oldFormValue, this.form.getRawValue()) ||
          this.form.invalid;

      })
    );

    this.sub$.add(
      this.form.get('stage')?.valueChanges.subscribe(
        () => {
          this.updateProductValue();
        }
      )
    );
  }

  private updateProductValue(): void {
    const stage = this.form.get('stage')?.value;
    this.hiddenFooter = !this.showValuesAccept.includes(stage) && !this.formDisabled;
    this.showDelete = this.showValuesAccept.includes(stage);
    this.showPrint = this.showValuesPrint.includes(stage) && !this.formDisabled;
    const disabled = !this.showValuesAccept.includes(stage);
    const formArray = this.saleProductsArray;
    for (let i = 0; i < formArray.length; i++) {
      if (disabled) {
        formArray.at(i).get('amount')?.disable();
      } else {
        formArray.at(i).get('amount')?.enable();
      }
    }
    if (!STAGES_ACTIVES.includes(stage) && this.formDisabled) {
      this.form.disable({ emitEvent: false });
      this.formDisabled = true;
    }
  }

  get saleProductsArray() {
    return this.form.get('saleProducts') as FormArray;
  }

  addExam(saleProduct?: SaleProduct) {
    if (this.ctrlProduct.valid || saleProduct) {
      const product: ProductItemVM = this.ctrlProduct.value;
      if (product || saleProduct) {
        this.saleProductsArray.push(this.formBuilder.group({
          id: [null || saleProduct?.id],
          productId: [product?.id || saleProduct?.product?.id, Validators.required],
          name: [{ value: product?.name || saleProduct?.product?.name, disabled: true }, Validators.required],
          amount: [1 || saleProduct?.amount, [Validators.required, Validators.min(0.01)]],
          price: [{ value: product?.price || saleProduct?.price, disabled: true }],
          subtotal: [{ value: product?.price * 1 || saleProduct?.subtotal, disabled: true }],
        }));

        this.subArray$.unsubscribe();
        this.saleProductsArray.controls.forEach(
          (control) => {
            this.subArray$.add(
              () => {
                const form = (control as FormGroup);
                form.controls['amount']?.valueChanges.subscribe(
                  (amount) => {
                    form.patchValue({
                      subtotal: form.controls['price'].value * amount,
                    }, { emitEvent: false });
                    this.updateTotal();
                  }
                )
              }
            );
          }
        );
        this.ctrlProduct.reset();
        this.updateProducts();
      }
    }
  }

  removeExam(index: number) {
    this.saleProductsArray.removeAt(index);
    this.updateProducts();
  }

  private updateProducts(): void {
    const productIds = this.saleProductsArray.value.map((x: any) => x.productId);
    this.products = this.productsBase.filter((x) => !productIds.includes(x.id));
    this.updateTotal();
  }

  clickSave(): void {
    if (this.id) {
      this.update();
    } else {
      this.create();
    }
  }

  private create(): void {
    if (!this.submitDisabled) {
      this.sub$.add(
        this.entityService
          .create({
            ...this.form.getRawValue(),
          })
          .subscribe(
            () => {
              this.form.reset();
              this.clickClosed();
              this.toastService.success('¡Venta creada exitosamente!');
            }
          )
      );
    }
  }

  private update(): void {
    if (!this.submitDisabled) {
      this.sub$.add(
        this.entityService
          .update({
            ...this.form.getRawValue(),
            id: this.id,
          })
          .subscribe(
            () => {
              this.form.reset();
              this.clickClosed();
              this.toastService.success('¡Venta actualizada exitosamente!');
            }
          )
      );
    }
  }

  findPatient(): void {
    const customerDocument = this.form.get('customerDocument')?.value;
    if (customerDocument && !this.id) {
      this.sub$.add(
        this.entityService.findPatientByDocument$(customerDocument).subscribe(
          (customer) => {
            if (customer?.id) {
              this.form.patchValue({
                customerId: customer.id,
                customerName: customer.name,
              });
            }
          }
        )
      );
    }
  }

  private getProducts(): void {
    this.sub$.add(
      this.entityService.getProducts$().subscribe(
        (products) => {
          this.products = products;
          this.productsBase = products;
          this.updateProducts();
        }
      )
    );
  }

  private updateTotal(): void {
    const total: number = this.saleProductsArray
      .getRawValue()
      .reduce(
        (accumulator: number, currentValue: SaleProduct) => accumulator + +currentValue.subtotal, 0,
      );
    this.form.patchValue({
      total: total.toString(),
    });
  }

  back(): void {
    this.location.back();
  }


  generateReportSale(): void {
    this.sub$.add(
      this.entityService.generateReportSale({
        id: this.id
      }).subscribe(
        (report) => {
          console.log(report);
          const link = document.createElement('a');
          link.href = report?.reportUrl;
          link.target = '_black';
          link.download = report?.name;
          link.click();
          
        }
      )
    );
  }

}

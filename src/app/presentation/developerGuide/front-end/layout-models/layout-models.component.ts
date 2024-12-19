import { Component } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
@Component({
  selector: 'app-layout-models',
  standalone: true,
  imports: [ MatExpansionModule ],
  templateUrl: './layout-models.component.html',
  styleUrl: './layout-models.component.scss'
})
export class LayoutModelsComponent {
  headerHTML=`<header class="section__header bg-red">
    <!--Title-->
    <h1>Codename Pulse</h1>
    <!--SubTitle-->
    <h6>User 1:1 Connect Report</h6>
    <!--Header Menu-->
    <section class="section__header__description bg-black">
      <button class="left--section disabled">test</button>
      <h3 class="middle--section">1:1 Connect</h3>
      <section class="right--section">
       <p>Ready to Download</p>  
      </section>
    </section>
  </header>`

  headerCSS=`
  .section__header{
  height: 20%;
  h1,h6{
    padding: 0 $spacing ;
  }
  &:not(.section__header__description){
    h1{
      font-family: $font-family-base-links;
    }
  }
  &:has(.section__header__description){
    h1{
      font-family: $font-family-base;
    }
  }
  h6{
    font-family: $font-family-base-links;
  }
  &__description{
    @extend .flex-container;
    &:not(.left--section){
      @extend .center;
    }
    &:has(.left--section){
      @extend .space-between;
    }
    width: 100%;
    padding: $spacing*0.5 $spacing;
    margin-top: 3rem;
    .left--section,
    .middle--section,
    .right--section{
      margin: 0;
      @extend .flex-child;
      *{
        padding: 0;
        margin: 0;
        font-size: $font-size-smallText;
      }
    }
    .middle--section{
      font-family: $font-family-base-links;
    }
  }
}

  `

  CardHTML =`
      <section class="section__card">
        <!--Card Header-->
        <section class="section__card__header">
          <button class="left--section primary">Filter</button>
          <!-- <h6 class="middle--section">Dashboard</h6> -->
          <button class="right--section secondary">Sept</button>
        </section>
        <!--Card Section-->
        <section class="section__card__container">
          <section class="card"></section>
          <section class="card"></section>
          <section class="card"></section>
          <section class="card"></section>
          <section class="card"></section>
          <section class="card"></section>
          <section class="card"></section>
          <section class="card"></section>

        </section>
      </section>
  `

  CardCSS=`
  .section__card{
  @extend .bg-white;
  margin: $spacing;
  border: $border-component;
  border-radius: $border-radius;
  &__header{
    @extend .flex-container,.space-between;
    width: 100%;
    padding: $spacing $spacing*2 $spacing*0.5; 
    border-bottom: $border-component;
    .left--section,
    .middle--section,
    .right--section{
      margin: 0;
    }
  }
  &__container{
    @extend .flex-container,.wrap;
    padding: $spacing $spacing*2;
    .card{
      @extend .grid-container;
      min-width: 300px;
      min-height: 150px;
      padding: $spacing;
      border: $border-component;
      border-radius: $border-radius;
      box-shadow: $box-shadow-default;
      *{
        padding: 0;
        margin: 0;
      }
      .avatar__container{
        @extend .flex-container;
        gap: 0;
        .avatar{
          width: 2.25rem;
          height: 2.25rem;
          border-radius: 50%;
          object-fit: cover;
        }
        &.collapse .avatar{
          margin-left: -.62rem;
        }
      }
    }
  }
}
  `
}

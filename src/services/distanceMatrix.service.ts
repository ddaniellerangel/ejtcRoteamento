import { Injectable } from "@angular/core";
import { DistanceMatrix } from "src/models/distanceMatrix";

@Injectable()

export class DistanceMatrixService {

    private distanceMatrix: DistanceMatrix;

    constructor() {
    }

    setDistanceMatrix(distanceMatrix : DistanceMatrix){
        this.distanceMatrix = distanceMatrix;
    }

    getDistanceMatrix(){
        return this.distanceMatrix;
    }
}
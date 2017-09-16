import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import { Artist } from './../Modules/artist';
import { ArtistService } from './../Services/artist.service';
import { SongService } from '../Services/song.service';

@Component({
    selector: 'top10artists',
    templateUrl: './../Views/top10artists.component.html',
    providers: [SongService]
})
export class Top10ArtistsComponent implements OnInit {

    artists: Array<Artist>;
    private width: number;
    private height: number;
    private radius: number;

    private arc: any;
    private labelArc: any;
    private pie: any;
    private color: any;
    private svg: any;

    constructor(private artistService: ArtistService) {
        this.width = 500;
        this.height = 500;
        this.radius = Math.min(this.width, this.height) / 2;
        this.artists = new Array<Artist>();
        this.getArtist();
    }

    ngOnInit(): void {
        this.initSvg();
    }

    initSvg(): any {
        this.color = d3Scale.scaleOrdinal()
            .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
        this.arc = d3Shape.arc()
            .outerRadius(this.radius - 10)
            .innerRadius(0);
        this.labelArc = d3Shape.arc()
            .outerRadius(this.radius - 40)
            .innerRadius(this.radius - 40);
        this.pie = d3Shape.pie()
            .sort(null)
            .value((d: any) => d.views);
        this.svg = d3.select("svg")
            .append("g")
            .attr("transform", "translate(" + this.width / 2 + "," + this.height / 2 + ")");;
    }

    getArtist(): void {
        this.artistService.getTopArtists()
            .subscribe((topArtists) => {
                this.artists = topArtists;
                this.drawPie();
            })
    }

    private drawPie() {
        let g = this.svg.selectAll(".arc")
            .data(this.pie(this.artists))
            .enter().append("g")
            .attr("class", "arc");
        g.append("path").attr("d", this.arc)
            .style("fill", (d: { data: Artist }) => this.color(d.data._id));
        g.append("text").attr("transform", (d: any) => "translate(" + this.labelArc.centroid(d) + ")")
            .attr("dy", ".35em")
            .text((d: { data: Artist }) => {
                return d.data.firstName + ' ' + d.data.lastName;
            });
    }
}
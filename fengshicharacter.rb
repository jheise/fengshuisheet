#!/usr/bin/ruby
require 'rubygems'
require 'sinatra'
require 'sqlite3'
require 'json'

db = SQLite3::Database.new("characters.db")
db.results_as_hash = true

def getCharacterID(db,name)
    db.execute("select id from characters where name = \"#{name}\";")[0][0]
end

get "/characters/:name/skills" do
    begin
        chr = getCharacterID(db,params[:name])
        results = db.execute("select * from skills where chr = #{chr};")
        return results.to_json
    rescue Exception =>e
        puts e.message
        puts e.backtrace.inspect
    end
end

get "/characters/:name/attacks" do
    begin
        chr = getCharacterID(db,params[:name])
        results = db.execute("select * from weapons where chr = #{chr};")
        return results.to_json
    rescue Exception =>e
        puts e.message
        puts e.backtrace.inspect
    end
end

get "/characters/:name/schiticks" do
    begin
        chr = getCharacterID(db,params["name"])
        results = db.execute("select * from schiticks where chr = #{chr};")
        return results.to_json
    rescue Exception =>e
        puts e.message
        puts e.backtrace.inspect
    end
end

post "/characters/:name/schiticks" do
    begin
        schitick,chi,shots,notes = JSON.parse(params["data"])["schitick"].split("/")
        chi = Integer(chi)
        shots = Integer(shots)
        unless notes
            notes = "-"
        end
        character_id = getCharacterID(db,params["name"])
        results = db.execute("INSERT INTO schiticks ( chr,schitick,chi,shots,notes ) VALUES (#{character_id},'#{schitick}',#{chi},#{shots},'#{notes}');")
        puts "schitck #{schitick} added"
        results = db.execute("select * from schiticks where chr = #{character_id} order by ROWID DESC limit 1;")[0]
        puts "results are #{results}"
        return results.to_json
    rescue Exception => e
        puts e.message
        puts e.backtrace.inspect
    end
end

post "/posttest" do
    puts params[:foobar]
    return "#{params[:foobar]}\n"
end

delete "/characters/:name/schiticks/:id" do
    begin
        id = Integer(params[:id])
        chr = getCharacterID(db,params[:name])
        db.execute( "DELETE FROM schiticks WHERE chr = #{chr} and id = #{id};")
        return "success"
    rescue Exception => e
        pp e.message
        pp e.backtrace.inspect
    end
    return "Failure deleting Schitick"
end

get "/characters/:name/equipment" do
    begin
        character_id = getCharacterID(db,params[:name])
        results = db.execute("select * from notes where chr = #{character_id};")
        return results.to_json
    rescue Exception =>e
        puts e.message
        puts e.backtrace.inspect
    end
end

get "/characters/:name" do
    begin
        results = db.execute("select * from characters where name = \"#{params[:name]}\";")[0]
        return results.to_json
    rescue Exception =>e
        puts e.message
        puts e.backtrace.inspect
    end
    return "No Character named #{params[:name]}"
end

get "/characters" do
    begin
        db.results_as_hash = false
        results = db.execute("select name from characters;")
        db.results_as_hash = true
        return results.to_json
    rescue Exception =>e
        puts e.message
        puts e.backtrace.inspect
    end
    return "No Characters"
end

get "/" do
    erb :root
end

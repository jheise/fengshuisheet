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


delete "/characters/:name/skills/:id" do
    begin
        puts "params are #{params}"
        id = Integer(params[:id])
        chr = getCharacterID(db,params[:name])
        puts "got delete for #{params[:name]} #{params[:id]}"
        db.execute( "DELETE FROM skills WHERE chr = #{chr} and id = #{id};")
        return "success"
    rescue Exception => e
        puts e.message
        puts e.backtrace.inspect
    end
    return "Failure deleting skill"
end

delete "/characters/:name/attacks/:id" do
    begin
        puts "params are #{params}"
        id = Integer(params[:id])
        chr = getCharacterID(db,params[:name])
        puts "got delete for #{params[:name]} #{params[:id]}"
        db.execute( "DELETE FROM weapons WHERE chr = #{chr} and id = #{id};")
        return "success"
    rescue Exception => e
        puts e.message
        puts e.backtrace.inspect
    end
    return "Failure deleting attack"
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
    return "Failure deleting schitick"
end

delete "/characters/:name/equipment/:id" do
    begin
        id = Integer(params[:id])
        chr = getCharacterID(db,params[:name])
        db.execute( "DELETE FROM notes WHERE chr = #{chr} and id = #{id};")
        return "success"
    rescue Exception => e
        puts e.message
        puts e.backtrace.inspect
    end
    return "Failure delete equipment"
end

post "/characters/:name/schiticks" do
    begin
        schitick,chi,shots,notes = JSON.parse(params["data"])["schitick"].split("/")
        chi = Integer(chi)
        shots = Integer(shots)
        unless notes
            notes = "-"
        end
        character_id = getCharacterID(db,params[:name])
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

post "/characters/:name/skills" do
    begin
        skill,ga,bon,av = JSON.parse(params["data"])["skill"].split("/")
        bon = Integer(bon)
        av = Integer(av)
        chr = getCharacterID(db,params["name"])
        db.execute("INSERT INTO SKILLS ( chr,skill,ga,bon,av) VALUES (#{chr}, '#{skill}', '#{ga}',#{bon},#{av});")
        results = db.execute("select * from skills where chr = #{chr} order by ROWID DESC limit 1;")[0]
        return results.to_json
    rescue Exception => e
        puts e.message
        puts e.backtrace.inspect
    end
    return "Error add skill for #{params[:name]}"
end

post "/characters/:name/equipment" do
    begin
        puts "params are #{params}"
        gear = JSON.parse(params[:data])["equipment"]
        chr = getCharacterID(db,params[:name])
        db.execute("INSERT INTO notes (chr, note) VALUES (#{chr}, '#{gear}');")
        results = db.execute("select * from notes where chr = #{chr} order by ROWID DESC limit 1;")[0]
        return results.to_json
    rescue Exception => e
        puts e.message
        puts e.backtrace.inspect
    end
    return "Error adding equipment for #{params[:name]}"
end

post "/characters/:name/attacks" do
    begin
        puts "params are #{params}"
        newattack = JSON.parse(params[:data])["attack"]
        name,dmg,conceal,capacity,notes = newattack.split("/")
        chr = getCharacterID(db,params[:name])
        db.execute("INSERT INTO weapons ( chr, name, dmg, conceal, capacity, notes) VALUES(#{chr}, '#{name}', '#{dmg}', '#{conceal}', '#{capacity}', '#{notes}');")
        results = db.execute("SELECT * FROM weapons WHERE chr= #{chr} ORDER BY ROWID DESC limit 1;")[0]
        newattack = "#{name}: #{dmg} / #{conceal} / #{capacity} / #{notes}"
        return {"id" => results["id"],"line" => newattack}.to_json
    rescue Exception => e
        puts e.message
        puts e.backtrace.inspect
    end
    return "Error adding attack for #{params[:name]}"
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

# get all schiticks for a character
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

# get all equipment for a character
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

# gets character specified by name
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

# returns a list of all characters in database
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

#return root page
get "/" do
    erb :root
end
